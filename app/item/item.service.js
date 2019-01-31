"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var responseoption_1 = require("./responseoption");
var studyform_1 = require("./studyform");
require("rxjs/add/operator/map");
var segmented_bar_1 = require("ui/segmented-bar");
var platform_1 = require("platform");
var looseobject_1 = require("./looseobject");
//import 'rxjs/add/operator/shareReplay';
var application_settings_1 = require("application-settings");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })
};
var ItemService = /** @class */ (function () {
    function ItemService(http) {
        this.http = http;
    }
    ItemService.prototype.getRecordID = function () {
        // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&fields=' + 'record_id';
        // return this.http.post<any>(Config.apiUrl,data,httpOptions); //.shareReplay();
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&fields=' + 'record_id';
        return this.http.post(redcap.url, data, httpOptions); //.shareReplay();
    };
    ItemService.prototype.getUsers = function () {
        // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&forms=' + 'registration' + '&filterLogic' + '[uuid] ='+ device.uuid;
        // return this.http.post<any>(Config.apiUrl,data,httpOptions); 
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&forms=' + 'registration' + '&filterLogic=' + '[uuid]=\'' + platform_1.device.uuid + '\'';
        return this.http.post(redcap.url, data, httpOptions);
    };
    ItemService.prototype.getUserData = function (user, form_name) {
        // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json'+ '&exportSurveyFields=' + 'true' + '&filterLogic=[' + form_name + '_observantid]='+ user.record_id;
        // return this.http.post<any>(Config.apiUrl,data,httpOptions); 
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&exportSurveyFields=' + 'true' + '&filterLogic=[' + form_name + '_observantid]=' + user.record_id;
        return this.http.post(redcap.url, data, httpOptions);
    };
    ItemService.prototype.getFormInstanceData = function (form, record_id) {
        //var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&exportSurveyFields=' + 'true' +  '&fields=' + 'record_id' + '&forms=' + form;
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&exportSurveyFields=' + 'true' + '&fields=' + 'record_id' + '&forms=' + form;
        return this.http.post(redcap.url, data, httpOptions).map(
        //return this.http.post<any>(Config.apiUrl,data,httpOptions).map(
        function (fields) {
            var forms = fields.filter(function (e) { return (e.record_id === record_id && e.redcap_repeat_instrument === form); });
            return forms;
        });
    };
    ItemService.prototype.saveData = function (formData) {
        // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&overwriteBehavior=' + 'normal' + '&data=' + formData ;
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&overwriteBehavior=' + 'normal' + '&data=' + formData;
        //return this.http.post<any>(Config.apiUrl,data,httpOptions); //.shareReplay(); 
        return this.http.post(redcap.url, data, httpOptions); //.shareReplay(); 
    };
    ItemService.prototype.addProtocol = function () {
        //var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'metadata' + '&returnFormat=' + 'json';
        //return this.http.post<Studymetadata[]>(Config.apiUrl,data,httpOptions); 
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'metadata' + '&returnFormat=' + 'json';
        return this.http.post(redcap.url, data, httpOptions);
    };
    ItemService.prototype.getInstruments = function () {
        //console.log("calling get Instruments ....");
        var redcap = JSON.parse(application_settings_1.getString("server"));
        var instruments = new Array();
        //var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'instrument' + '&returnFormat=' + 'json';
        var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'instrument' + '&returnFormat=' + 'json';
        // this.http.post<any[]>(Config.apiUrl,data,httpOptions).subscribe(
        this.http.post(redcap.url, data, httpOptions).subscribe(function (data) {
            data.forEach(function (data_obj) {
                var obj = new looseobject_1.LooseObject();
                obj.key = data_obj.instrument_name;
                obj.value = data_obj.instrument_label;
                instruments.push(obj);
            });
        });
        return instruments;
    };
    ItemService.prototype.createResponseOptions = function (select_choices_or_calculations) {
        var options = new Array();
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
            var x = xoptions[index].split(",");
            var response = new responseoption_1.Responseoption();
            response.value = x[0].trim();
            var labeltext = "";
            for (var i = 1; i < x.length; i++) {
                labeltext = labeltext + x[i] + ",";
            }
            response.label = labeltext;
            options.push(response);
        }
        return options;
    };
    ItemService.prototype.createLabelOptions = function (select_choices_or_calculations) {
        var options = [];
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
            var x = xoptions[index].split(",");
            var labeltext = "";
            for (var i = 1; i < x.length; i++) {
                labeltext = labeltext + x[i] + ",";
            }
            options.push(labeltext);
            //options.push(x[1]);
        }
        return options;
    };
    ItemService.prototype.createYesNo = function () {
        var myItems = [];
        for (var i = 1; i < 5; i++) {
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = "Tab " + i;
            myItems.push(item);
        }
        return myItems;
    };
    ItemService.prototype.getItems = function () {
        var _this = this;
        var forms = new Array();
        var instruments = this.getInstruments();
        return this.addProtocol().map(function (fields) {
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                if (field.form_name == 'registration') {
                    continue;
                }
                if (field.field_annotation == '@HIDDEN') {
                    continue;
                }
                var found = false;
                for (var i = 0; i < forms.length; i++) {
                    if (forms[i].form_name == field.form_name) {
                        found = true;
                        field.select_choices = _this.createResponseOptions(field.select_choices_or_calculations);
                        field.select_labels = _this.createLabelOptions(field.select_choices_or_calculations);
                        //field.yesno = this.createYesNo();
                        field.answer = "";
                        field.visibility = "visible";
                        forms[i].fields.push(field);
                        break;
                    }
                }
                if (!found) {
                    var sf = new studyform_1.Studyform();
                    sf.form_name = field.form_name;
                    //search for the instrument label
                    sf.form_label = instruments.filter(function (instrument) { return instrument.key === sf.form_name; })[0].value;
                    sf.fields = new Array();
                    field.select_choices = _this.createResponseOptions(field.select_choices_or_calculations);
                    field.select_labels = _this.createLabelOptions(field.select_choices_or_calculations);
                    //field.yesno = this.createYesNo();
                    field.answer = "";
                    field.visibility = "visible";
                    sf.fields.push(field);
                    // console.log("..adding " + field.field_name);
                    forms.push(sf);
                }
            }
            return forms;
        });
    };
    /*
    getItem(id: string): Studyform {
        return this.forms.filter(form => form.form_name === id)[0];
    }
    */
    ItemService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        //return Observable.throw(error);
    };
    ItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
