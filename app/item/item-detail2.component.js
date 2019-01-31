"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var application_settings_1 = require("application-settings");
var listviewresponses_1 = require("./listviewresponses");
var item_service_1 = require("./item.service");
var cache_service_1 = require("./cache.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var hint_1 = require("./hint");
var app_store_1 = require("../app.store");
var looseobject_1 = require("./looseobject");
var page_1 = require("ui/page");
var ItemDetail2Component = /** @class */ (function () {
    function ItemDetail2Component(store, page, route, itemService, modal, vcRef, routerExtensions, cacheService) {
        this.store = store;
        this.page = page;
        this.route = route;
        this.itemService = itemService;
        this.modal = modal;
        this.vcRef = vcRef;
        this.routerExtensions = routerExtensions;
        this.cacheService = cacheService;
        this.page_size = 3;
        this.hint = {};
    }
    ItemDetail2Component.prototype.ngAfterViewInit = function () {
        this.contentView.nativeElement.opacity = 100;
        this.setNavigation();
        //this.contentView.nativeElement.visibility = "hidden";
        /*
        this.contentView.nativeElement.animate({
            opacity: 100,
            duration: 500
        });
        */
    };
    ItemDetail2Component.prototype.setNavigation = function () {
        var prev = this.page.getViewById('prev');
        if (this.position <= 0) {
            prev.isEnabled = false;
        }
        else {
            prev.isEnabled = true;
        }
    };
    ItemDetail2Component.prototype.ngOnInit = function () {
        this.forms = JSON.parse(application_settings_1.getString("studyForms"));
        var id = this.route.snapshot.params["form_name"];
        this.form = this.forms.filter(function (form) { return form.form_name === id; })[0];
        this.setUser(); //need to setUser after this.form, but before this.toFormGroup
        this.fields = this.form.fields;
        this.myForm = this.toFormGroup(this.fields);
        var _position = this.route.snapshot.params["position"];
        if (isNaN(_position)) {
            this.position = 0;
        }
        else {
            this.position = parseInt(_position);
        }
        this.paginate(this.position);
    };
    ItemDetail2Component.prototype.setUser = function () {
        var _this = this;
        if (application_settings_1.hasKey("ActiveUser")) {
            this.user = JSON.parse(application_settings_1.getString("ActiveUser"));
            var _schedules = this.user.schedule.filter(function (schedule) { return schedule.redcap_repeat_instrument === _this.form.form_name; });
        }
        else {
            var options = {
                title: "No User!",
                message: "Can not find user in application-settings",
                okButtonText: "OK"
            };
            alert(options);
        }
    };
    ItemDetail2Component.prototype.clearPage = function () {
        for (var i = 0; i < this._fields.length; i++) {
            if (this._fields[i].field_type == 'radio') {
                for (var j = 0; j < this._fields[i].select_choices.length; j++) {
                    if (this.page.getViewById(this._fields[i].field_name + "_" + this._fields[i].select_choices[j].value) == undefined) {
                        continue;
                    }
                    var _StackLayout = this.page.getViewById(this._fields[i].field_name + "_" + this._fields[i].select_choices[j].value);
                    _StackLayout.backgroundColor = "#edf0f2";
                }
            }
            if (this._fields[i].field_type == 'yesno') {
                var btn_No = this.page.getViewById(this._fields[i].field_name + "_0");
                var btn_Yes = this.page.getViewById(this._fields[i].field_name + "_1");
                btn_No.backgroundColor = "white";
                btn_Yes.backgroundColor = "white";
            }
        }
    };
    ItemDetail2Component.prototype.updateUI = function () {
        for (var j = 0; j < this._fields.length; j++) {
            if (this.myForm.value[this._fields[j].field_name] != "") {
                if (this._fields[j].field_type == "yesno") {
                    var value = this.myForm.value[this._fields[j].field_name];
                    if (value == "1") {
                        var btn = this.page.getViewById(this._fields[j].field_name + "_1");
                        btn.backgroundColor = "#30bcff";
                    }
                    if (value == "-1") {
                        var btn = this.page.getViewById(this._fields[j].field_name + "_0");
                        btn.backgroundColor = "#30bcff";
                    }
                }
                if (this._fields[j].field_type == "radio") {
                    var stack = this.page.getViewById(this._fields[j].field_name + "_" + this.myForm.value[this._fields[j].field_name]);
                    stack.backgroundColor = "#30bcff";
                }
            }
        }
    };
    ItemDetail2Component.prototype.paginate = function (_position) {
        var _this = this;
        this.position = _position;
        this.end = this.position + this.page_size;
        this._fields = this.fields.slice(this.position, this.end);
        // hide the follow-up questions if first questions is not 'YES'
        if (this._fields[0].answer != "1") {
            for (var i = 1; i < this._fields.length; i++) {
                this._fields[i].visibility = 'hidden';
                this.fields = this.fields.map(function (obj) { return _this._fields.find(function (o) { return o.field_name === obj.field_name; }) || obj; });
            }
        }
    };
    ItemDetail2Component.prototype.toFormGroup = function (questions) {
        var _this = this;
        var group = {};
        questions.forEach(function (question) {
            question.field_label = question.field_label.replace("[name]", _this.user.name);
            _this.parseHint(question.field_name, question.select_labels);
            //question.select_labels = this.parseResponses(question.select_labels);
            question.select_responses = _this.parseResponses2(question.field_name, question.select_labels, question.select_choices);
            group[question.field_name] = new forms_1.FormControl(question.field_name);
            group[question.field_name].value = "";
            if (question.field_name == "name") {
                group[question.field_name].value = "Enter your name";
            }
        });
        return new forms_1.FormGroup(group);
    };
    ItemDetail2Component.prototype.parseResponses2 = function (field_name, response, scores) {
        var rtn = [];
        //var pattern = "{(.*)";
        var pattern = "(.*){(.*)}";
        for (var i = 0; i < response.length; i++) {
            var _key = "";
            var _hint = "";
            if (response[i] != null) {
                if (response[i].match(pattern) != null) {
                    _hint = response[i].match(pattern)[2];
                    _key = response[i].match(pattern)[1];
                    //response[i] = "<b>" + _key + "</b>:" + _hint;
                    //console.log(response[i]);
                }
                /*
                if(response[i].match(pattern) != null){
                    var search = "{" + response[i].match(pattern)[1];
                    response[i] = response[i].replace(search, "");
                }
                */
            }
            var lvr = new listviewresponses_1.ListViewResponses();
            lvr.field_name = field_name;
            lvr.response_name = _key; //response[i];
            lvr.response_label = _hint; //response[i];
            lvr.response_value = parseInt(scores[i].value);
            lvr.answer = "";
            rtn.push(lvr);
        }
        return rtn;
    };
    ItemDetail2Component.prototype.parseResponses = function (response) {
        var pattern = "{(.*)";
        for (var i = 0; i < response.length; i++) {
            if (response[i] != null) {
                if (response[i].match(pattern) != null) {
                    var search = "{" + response[i].match(pattern)[1];
                    response[i] = response[i].replace(search, "");
                }
            }
        }
        return response;
    };
    ItemDetail2Component.prototype.displayHint = function (args) {
        var _this = this;
        var title = this.fields.filter(function (field) { return field.field_name === args; })[0].field_label;
        var options = {
            context: { "title": title, "code": this.hint[args] },
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(hint_1.HintComponent, options).then(function (res) {
            var _field = _this.fields.filter(function (field) { return field.field_name === args; });
            if (_field.length > 0) {
                var response = _field[0].select_responses.filter(function (o) { return o.response_name.trim() == res.trim(); });
                if (response.length > 0) {
                    _field[0].answer = response[0].response_value.toString();
                    for (var j = 0; j < _field[0].select_responses.length; j++) {
                        _field[0].select_responses[j].answer = _field[0].answer;
                    }
                    _this.myForm.value[_field[0].field_name] = _field[0].answer;
                    _this.fields = _this.fields.map(function (obj) { return _field.find(function (o) { return o.field_name === obj.field_name; }) || obj; });
                    //caching data in case not connected.
                    _this.cacheService.addData(_this.user, _this.myForm, _this.form.form_name);
                    _this.contentView.nativeElement.refresh();
                }
            }
        });
    };
    ItemDetail2Component.prototype.parseHint = function (key, response) {
        var itemHints = [];
        var pattern = "(.*){(.*)}";
        for (var i = 0; i < response.length; i++) {
            if (response[i] != null && response[i] != "") {
                response[i] = response[i].replace("[name]", this.user.name);
                if (response[i].match(pattern) != null) {
                    var _hint = response[i].match(pattern)[2];
                    var _key = response[i].match(pattern)[1];
                    var _responseHint = new looseobject_1.LooseObject();
                    _responseHint.key = _key;
                    _responseHint.value = _hint;
                    //itemHints.push(_key + " = " +  _hint );
                    itemHints.push(_responseHint);
                }
            }
        }
        if (itemHints.length > 0) {
            this.hint[key] = itemHints;
        }
    };
    ItemDetail2Component.prototype.saveFormData = function (data) {
        var _this = this;
        var _schedules = this.user.schedule.filter(function (schedule) { return schedule.redcap_repeat_instrument === _this.form.form_name; });
        var obj = {};
        obj.record_id = this.user.record_id;
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            if (data[key] != "") {
                obj[key] = data[key];
                if (data[key] == -1) {
                    obj[key] = 0;
                }
            }
        }
        obj["redcap_repeat_instrument"] = _schedules[0].redcap_repeat_instrument;
        obj["redcap_repeat_instance"] = _schedules[0].redcap_repeat_instance.toString();
        application_settings_1.setString("redcap_repeat_instance", obj["redcap_repeat_instance"]);
        //tag each record with an user-defined record-id so data can be pulled with filterLogic.
        obj[this.form.form_name + "_observantid"] = this.user.record_id;
        obj[this.form.form_name + "_date_entered"] = new Date().toLocaleString();
        var myPackage = [];
        myPackage.push(obj);
        this.itemService.saveData(JSON.stringify(myPackage)).subscribe(function (fields) {
            if (fields.count == 1) {
                _this.cacheService.removeData(obj, _this.form.form_name);
            }
        });
    };
    ItemDetail2Component.prototype.onSwitchChecked = function (args) {
        var _this = this;
        var button = args.object;
        var field_name = button.id.substring(0, button.id.length - 2);
        var btn_No = this.page.getViewById(field_name + "_0");
        var btn_Yes = this.page.getViewById(field_name + "_1");
        var _controls = this.fields.filter(function (control) { return control.field_name === field_name; });
        if (button === btn_Yes) {
            this.myForm.value[field_name] = 1;
            _controls[0].answer = "1";
            // hide the follow-up questions initially
            for (var i = 1; i < this._fields.length; i++) {
                this._fields[i].visibility = 'visible';
                this.fields = this.fields.map(function (obj) { return _this._fields.find(function (o) { return o.field_name === obj.field_name; }) || obj; });
            }
        }
        if (button === btn_No) {
            this.myForm.value[field_name] = -1;
            _controls[0].answer = "-1";
        }
        this.fields = this.fields.map(function (obj) { return _controls.find(function (o) { return o.field_name === obj.field_name; }) || obj; });
        this.contentView.nativeElement.refresh();
        //caching data in case not connected.
        this.cacheService.addData(this.user, this.myForm, this.form.form_name);
    };
    ItemDetail2Component.prototype.onSelectResponse = function (args) {
        for (var i = 0; i < args.object.items.length; i++) {
            var _StackLayout = this.page.getViewById(args.object.id + "_" + args.object.items[i].response_value);
            // _StackLayout.backgroundColor = "#edf0f2";
        }
        var _fields = this.fields.filter(function (field) { return field.field_name === args.object.id; });
        var responsescore = _fields[0].select_choices; // Responseoption[]
        //args.view.backgroundColor ="#30bcff";
        this.myForm.value[args.object.id] = responsescore[args.index].value;
        var _controls = this.fields.filter(function (control) { return control.field_name === args.object.id; });
        _controls[0].answer = responsescore[args.index].value;
        for (var j = 0; j < _controls[0].select_responses.length; j++) {
            _controls[0].select_responses[j].answer = _controls[0].answer;
        }
        this.fields = this.fields.map(function (obj) { return _controls.find(function (o) { return o.field_name === obj.field_name; }) || obj; });
        this.contentView.nativeElement.refresh();
        //caching data in case not connected.
        this.cacheService.addData(this.user, this.myForm, this.form.form_name);
    };
    ItemDetail2Component.prototype.previous = function (args) {
        this.clearPage();
        if (this.position - this.page_size >= 0) {
            this.position = this.position - this.page_size;
        }
        this.paginate(this.position);
        this.setNavigation();
    };
    ItemDetail2Component.prototype.submit = function (args) {
        this.clearPage();
        this.position = this.end;
        if (this.position >= this.fields.length) {
            this.saveFormData(this.myForm.value);
            this.routerExtensions.navigate(["/forms"], {
                transition: {
                    name: "flip",
                    duration: 400,
                    curve: "linear"
                }
            });
        }
        else {
            this.paginate(this.position);
            this.setNavigation();
        }
    };
    __decorate([
        core_1.ViewChild("content"),
        __metadata("design:type", core_1.ElementRef)
    ], ItemDetail2Component.prototype, "contentView", void 0);
    ItemDetail2Component = __decorate([
        core_1.Component({
            selector: "ns-details",
            moduleId: module.id,
            templateUrl: "./item-detail2.component.html",
            styleUrls: ["./item-detail-common.css", "./item-detail.css"]
        }),
        __param(0, core_1.Inject(app_store_1.AppStore)),
        __metadata("design:paramtypes", [Object, page_1.Page, router_1.ActivatedRoute, item_service_1.ItemService, dialogs_1.ModalDialogService, core_1.ViewContainerRef, router_2.RouterExtensions, cache_service_1.CacheService])
    ], ItemDetail2Component);
    return ItemDetail2Component;
}());
exports.ItemDetail2Component = ItemDetail2Component;
