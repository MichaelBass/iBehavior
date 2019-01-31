"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var HintComponent = /** @class */ (function () {
    function HintComponent(params, page) {
        this.params = params;
        this.page = page;
        this.hints = params.context.code;
        this.title = params.context.title;
    }
    HintComponent.prototype.ngOnInit = function () {
        // var lv = this.page.getViewById("content");   
        // lv.android.setFastScrollAlwaysVisible(true);
    };
    HintComponent.prototype.onSelectResponse = function (args) {
        this.answer = args;
        this.params.closeCallback(this.answer);
    };
    HintComponent.prototype.close = function (res) {
        this.params.closeCallback(this.answer);
    };
    HintComponent = __decorate([
        core_1.Component({
            selector: "my-hint",
            templateUrl: "./hint.html",
            styleUrls: ["./hint.css"]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, page_1.Page])
    ], HintComponent);
    return HintComponent;
}());
exports.HintComponent = HintComponent;
