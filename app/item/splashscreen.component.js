"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_service_1 = require("./item.service");
var cache_service_1 = require("./cache.service");
var application_settings_1 = require("application-settings");
var connectivity = require("connectivity");
//const platformModule = require("tns-core-modules/platform");
var dialogs = require("ui/dialogs");
var config_1 = require("./config");
var redcap_1 = require("./redcap");
var http_1 = require("@angular/common/http");
var SplashScreenComponent = /** @class */ (function () {
    function SplashScreenComponent(itemService, router, http, cacheService) {
        this.itemService = itemService;
        this.router = router;
        this.http = http;
        this.cacheService = cacheService;
    }
    SplashScreenComponent.prototype.ngDoCheck = function () {
        this.instructions = "Welcome to iBehavior, there are a few things that you need to do before we begin:";
        if (!application_settings_1.hasKey("server")) {
            this.server = "You will need to specify where your data will be sent. Click on the Settings and click the Download button to enter the study code that you were provided.  If you do not have a study code enter 'test'.";
            this.redcapColor = "red";
        }
        else {
            this.server = "";
            this.redcap = JSON.parse(application_settings_1.getString("server"));
            this.redcapColor = "green";
            this.activeREDCap = this.redcap.name;
        }
        if (!application_settings_1.hasKey("ActiveUser")) {
            this.activeuser = "You will need to set a user as active. Click on the Mange User and either create or select an user and make him/her active.";
            this.userColor = "red";
        }
        else {
            this.activeuser = "";
            this.user = JSON.parse(application_settings_1.getString("ActiveUser"));
            this.currentUser = this.user.name;
            this.userColor = "green";
        }
    };
    SplashScreenComponent.prototype.ngOnInit = function () {
        this.redcap = new redcap_1.REDCap();
        this.redcap.name = "";
        this.redcap.url = "";
        this.redcap.token = "";
        /*
                console.log(device.model);
                console.log(device.os);
                console.log(device.osVersion);
                console.log(device.uuid);
        */
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                //console.log("connectionType: None");
                break;
            case connectivity.connectionType.wifi:
                //console.log("connectionType: Wi-Fi");
                break;
            case connectivity.connectionType.mobile:
                //console.log("connectionType: Mobile");
                break;
            default:
                //console.log("connectionType: default?");
                break;
        }
        if (application_settings_1.hasKey("cacheResponse") && (connectionType == connectivity.connectionType.wifi)) {
            var myPackage = JSON.parse(application_settings_1.getString("cacheResponse"));
            for (var i = 0; i < myPackage.length; i++) {
                this.cacheService.uploadCachedData(myPackage[i]);
            }
        }
    };
    SplashScreenComponent.prototype.onResetCache = function (args) {
        this.cacheService.resetCache();
    };
    SplashScreenComponent.prototype.onViewCache = function (args) {
        var options = {
            title: "cache",
            message: application_settings_1.getString("cacheResponse"),
            okButtonText: "OK"
        };
        alert(options);
    };
    SplashScreenComponent.prototype.onSettings = function (args) {
        var _this = this;
        dialogs.prompt({
            title: "Configuration",
            message: "Please enter your study code",
            okButtonText: "Done",
            cancelButtonText: "Cancel",
            inputType: dialogs.inputType.text
        }).then(function (r) {
            if (r.result) {
                _this.http.get(config_1.Config.server + "/iBehavior/Config/" + r.text).subscribe(function (fields) {
                    //console.log(fields);
                    _this.redcap.name = fields[0].NAME;
                    _this.redcap.assessment_time = fields[1].ASSESSMENT_TIME;
                    _this.redcap.url = fields[2].URL;
                    _this.redcap.token = fields[3].TOKEN;
                    application_settings_1.setString("server", JSON.stringify(_this.redcap));
                }, function (error) { return console.log(error.message); });
            }
        });
    };
    SplashScreenComponent = __decorate([
        core_1.Component({
            selector: "ns-splashscreen",
            moduleId: module.id,
            templateUrl: "./splashscreen.component.html",
            styleUrls: ["./splashscreen-common.css", "./splashscreen.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService, router_1.Router, http_1.HttpClient, cache_service_1.CacheService])
    ], SplashScreenComponent);
    return SplashScreenComponent;
}());
exports.SplashScreenComponent = SplashScreenComponent;
