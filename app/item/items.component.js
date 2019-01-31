"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var router_1 = require("nativescript-angular/router");
var app_store_1 = require("../app.store");
var schedule_1 = require("./schedule");
var application_settings_1 = require("application-settings");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(store, itemService, routerExtensions) {
        this.store = store;
        this.itemService = itemService;
        this.routerExtensions = routerExtensions;
        this.forms = [];
    }
    ItemsComponent.prototype.ngOnInit = function () {
        if (!application_settings_1.hasKey("server")) {
            var options = {
                title: "Settings",
                message: "Setting have not been configured!",
                okButtonText: "OK"
            };
            alert(options);
        }
        else {
            this.redcap = JSON.parse(application_settings_1.getString("server"));
        }
        if (application_settings_1.hasKey("studyForms")) {
            this.forms = JSON.parse(application_settings_1.getString("studyForms"));
        }
        else {
            this.submit();
        }
        if (application_settings_1.hasKey("ActiveUser")) {
            this.user = JSON.parse(application_settings_1.getString("ActiveUser"));
            //}else{
            //    this.user = this.store.getState().user; 
        }
    };
    ItemsComponent.prototype.setSchedule = function () {
        var _this = this;
        var window = parseInt(this.redcap.assessment_time); // 30*1000; //24*60*60*1000;
        var _schedules = this.user.schedule.filter(function (schedule) { return schedule.redcap_repeat_instrument === _this.form.form_name; });
        if (_schedules.length == 0) {
            //console.log("no schedule exists: " + this.form.form_name + " : " + this.user.name );
            var form_schedule = new schedule_1.Schedule();
            form_schedule.redcap_repeat_instance = 1;
            form_schedule.redcap_repeat_instrument = this.form.form_name;
            form_schedule.start = new Date();
            form_schedule.end = new Date(form_schedule.start.getTime() + window);
            this.user.schedule.push(form_schedule);
            _schedules = this.user.schedule.filter(function (schedule) { return schedule.redcap_repeat_instrument === _this.form.form_name; });
        }
        var currentDate = new Date();
        if (currentDate > new Date(_schedules[0].start) && currentDate > new Date(_schedules[0].end)) {
            //console.log("Increment instance" + this.form.form_name + " : " + this.user.name);
            _schedules[0].redcap_repeat_instance += 1;
            _schedules[0].start = new Date();
            _schedules[0].end = new Date(_schedules[0].start.getTime() + window);
            this.user.schedule = this.user.schedule.map(function (obj) { return _schedules.find(function (o) { return o.redcap_repeat_instrument === obj.redcap_repeat_instrument; }) || obj; });
        }
        application_settings_1.setString("ActiveUser", JSON.stringify(this.user));
        //this.store.dispatch(UserActions.create_user(this.user));
        return _schedules[0];
    };
    ItemsComponent.prototype.onConfirm = function (args) {
        var _this = this;
        this.form = this.forms.filter(function (form) { return form.form_name === _this.forms[args.index].form_name; })[0];
        this.fields = this.form.fields;
        // var _title = this.form.fields[0].field_label.replace("[name]", this.user.name );
        // var _field_name = this.form.fields[0].field_name;
        this.schedule = this.setSchedule();
        this.flipToNextPage();
        /*
                dialogs.action({
                    title: this.forms[0].form_label,
                    message: _title,
                    actions: ["Yes", "No"]
                    
                }).then(result => {
                    if(result === "Yes"){
                        var data = JSON.parse("{\"" + _field_name + "\":1}");
                        //this.saveFormData(data);
        
                        args.view.backgroundColor ="green";
                        this.flipToNextPage();
                    }else{
                        var data = JSON.parse("{\"" + _field_name + "\":0}");
                        //this.saveFormData(data);
                        args.view.backgroundColor ="red";
                    }
                });
        */
    };
    ItemsComponent.prototype.submit = function () {
        var _this = this;
        this.itemService.getItems().subscribe(function (fields) {
            _this.forms = fields;
            application_settings_1.setString("studyForms", JSON.stringify(_this.forms));
            var options = {
                title: "Form List",
                message: _this.forms.length + " form(s) updated.",
                okButtonText: "OK"
            };
            alert(options);
        });
    };
    ItemsComponent.prototype.flipToNextPage = function () {
        this.routerExtensions.navigate(["/form", this.form.form_name], {
            transition: {
                name: "flip",
                duration: 400,
                curve: "linear"
            }
        });
    };
    ItemsComponent.prototype.saveFormData = function (data) {
        var obj = {};
        obj.record_id = this.user.record_id;
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            obj[key] = data[key];
        }
        obj["redcap_repeat_instrument"] = this.schedule.redcap_repeat_instrument;
        obj["redcap_repeat_instance"] = this.schedule.redcap_repeat_instance.toString();
        application_settings_1.setString("redcap_repeat_instance", obj["redcap_repeat_instance"]);
        //tag each record with an user-defined record-id so data can be pulled with filterLogic.
        obj["observantid"] = this.user.record_id;
        obj["date_entered"] = new Date().toLocaleString();
        var myPackage = [];
        myPackage.push(obj);
        this.itemService.saveData(JSON.stringify(myPackage)).subscribe(function (fields) {
            //console.log(fields);  
        });
        /*
        
                this.itemService.getFormInstanceData(this.form.form_name, this.user.record_id).subscribe(
                    fields =>{
        
                        var instance = 0;
                        if(fields.length>0){
                            instance = parseInt(fields[fields.length -1].redcap_repeat_instance);
                        }
        
                        var obj: LooseObject = {};
                        obj.record_id = this.user.record_id;
        
                        for (let key of Object.keys(data)) {
                            obj[key] = data[key];
                        }
        
                        // increment instance if not first time administered
                        if (!isNaN(instance)) {
                            obj["redcap_repeat_instrument"] = this.form.form_name;
                            obj["redcap_repeat_instance"] = instance + 1;
                        }else{
                            obj["redcap_repeat_instrument"] = this.form.form_name;
                            obj["redcap_repeat_instance"] = 1;
                        }
        
                        setString("redcap_repeat_instance", obj["redcap_repeat_instance"] );
                        //console.log("redcap_repeat_instance" + ":" + obj["redcap_repeat_instance"]);
        
                        //tag each record with an user-defined record-id so data can be pulled with filterLogic.
                        obj["observantid"] = this.user.record_id;
                        obj["date_entered"] = new Date().toLocaleString();
                        var myPackage =[];
                        myPackage.push(obj);
                        //console.log(myPackage);
        
                        this.itemService.saveData( JSON.stringify(myPackage) ).subscribe(
                            fields => {
                                console.log(fields);
                            }
                        );
                    }
                );
        */
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
            styleUrls: ["./items.css"]
        }),
        __param(0, core_1.Inject(app_store_1.AppStore)),
        __metadata("design:paramtypes", [Object, item_service_1.ItemService, router_1.RouterExtensions])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
