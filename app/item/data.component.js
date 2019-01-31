"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_settings_1 = require("application-settings");
var item_service_1 = require("./item.service");
var datastructure_1 = require("./datastructure");
var looseobject_1 = require("./looseobject");
var DataComponent = /** @class */ (function () {
    function DataComponent(itemService) {
        this.itemService = itemService;
        this.forms = [];
    }
    DataComponent.prototype.ngOnInit = function () {
        if (application_settings_1.hasKey("ActiveUser")) {
            this.user = JSON.parse(application_settings_1.getString("ActiveUser"));
        }
        if (application_settings_1.hasKey("studyForms")) {
            this.forms = JSON.parse(application_settings_1.getString("studyForms"));
        }
        this.getData();
    };
    DataComponent.prototype.getUserFormData = function (form_name) {
        console.log("adding data from " + form_name);
    };
    DataComponent.prototype.getData = function () {
        var _this = this;
        this.data = [];
        for (var i = 0; i < this.forms.length; i++) {
            this.itemService.getUserData(this.user, this.forms[i].form_name).subscribe(function (fields) {
                fields.forEach(function (assessmentform) {
                    var assessment = new datastructure_1.DataStructure();
                    assessment.results = [];
                    assessment.record_id = assessmentform.record_id;
                    assessment.redcap_repeat_instance = assessmentform.redcap_repeat_instance;
                    assessment.redcap_repeat_instrument = assessmentform.redcap_repeat_instrument;
                    for (var _i = 0, _a = Object.keys(assessmentform); _i < _a.length; _i++) {
                        var key = _a[_i];
                        var obj = new looseobject_1.LooseObject;
                        obj.key = key;
                        obj.value = assessmentform[key];
                        if (key != "observantid" && key != "record_id" && key != "redcap_repeat_instance" && key != "redcap_repeat_instrument")
                            assessment.results.push(obj);
                    }
                    _this.data.push(assessment);
                });
            });
        }
    };
    DataComponent = __decorate([
        core_1.Component({
            selector: "ns-data",
            moduleId: module.id,
            templateUrl: "./data.component.html",
            styleUrls: ["./data.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], DataComponent);
    return DataComponent;
}());
exports.DataComponent = DataComponent;
