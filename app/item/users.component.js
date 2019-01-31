"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_settings_1 = require("application-settings");
var item_service_1 = require("./item.service");
var platform_1 = require("platform");
var app_store_1 = require("../app.store");
var user_1 = require("./user");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(store, itemService) {
        this.store = store;
        this.itemService = itemService;
        this.editState = true;
    }
    UsersComponent.prototype.ngOnInit = function () {
        if (application_settings_1.hasKey("Users")) {
            this.users = JSON.parse(application_settings_1.getString("Users"));
            for (var i = 0, len = this.users.length; i < len; i++) {
                if (application_settings_1.hasKey("ActiveUser")) {
                    this.currentuser = JSON.parse(application_settings_1.getString("ActiveUser"));
                    if (this.users[i].record_id == this.currentuser.record_id) {
                        this.users[i].active = true;
                    }
                }
            }
        }
        else {
            this.users = [];
        }
    };
    UsersComponent.prototype.clearUsers = function () {
        application_settings_1.remove("Users");
        this.users = [];
    };
    UsersComponent.prototype.refreshUsers = function () {
        var _this = this;
        this.itemService.getUsers().subscribe(function (fields) {
            var filtered_user = fields.filter(function (a) { return a.uuid === platform_1.device.uuid; });
            _this.users = [];
            for (var i = 0, len = filtered_user.length; i < len; i++) {
                var _user = new user_1.UserModel();
                _user.record_id = filtered_user[i].record_id;
                _user.name = filtered_user[i].name;
                _user.uuid = filtered_user[i].uuid;
                _user.schedule = [];
                _user.active = false;
                _this.users.push(_user);
                //this.users.push(new UserModel( filtered_user[i].record_id, filtered_user[i].name, filtered_user[i].uuid, false)); 
            }
            application_settings_1.setString("Users", JSON.stringify(_this.users));
        });
    };
    UsersComponent.prototype.onItemTap = function (args) {
        for (var i = 0, len = this.users.length; i < len; i++) {
            this.users[i].active = false;
        }
        this.users[args.index].active = true;
        this.users[args.index].schedule = [];
        //this.store.dispatch(UserActions.create_user(this.users[args.index]));
        application_settings_1.setString("ActiveUser", JSON.stringify(this.users[args.index]));
        args.object.refresh();
    };
    UsersComponent.prototype.submit = function (args) {
        var textview = args.object;
        this.saveRegistration(textview.text, textview);
    };
    UsersComponent.prototype.saveRegistration = function (user, textview) {
        var _this = this;
        this.getNextrecord_id().subscribe(function (fields) {
            var new_user = JSON.parse("{\"record_id\":\"" + fields + "\",\"name\":\"" + user + "\",\"uuid\":\"" + platform_1.device.uuid + "\"}");
            var myPackage = [];
            myPackage.push(new_user);
            _this.itemService.saveData(JSON.stringify(myPackage)).subscribe(function (fields) {
                if (fields.count == 1) {
                    _this.refreshUsers();
                    textview.text = "";
                }
            });
        });
    };
    UsersComponent.prototype.getNextrecord_id = function () {
        return this.itemService.getRecordID().map(function (fields) {
            if (fields.length == 0) {
                return 1;
            }
            else {
                return Math.max.apply(Math, fields.map(function (o) { return o.record_id; })) + 1;
            }
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: "ns-users",
            moduleId: module.id,
            templateUrl: "./users.component.html",
            styleUrls: ["./users.css"]
        }),
        __param(0, core_1.Inject(app_store_1.AppStore)),
        __metadata("design:paramtypes", [Object, item_service_1.ItemService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
