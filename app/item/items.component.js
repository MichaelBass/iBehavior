"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var application_settings_1 = require("application-settings");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(itemService) {
        this.itemService = itemService;
        this.forms = [];
    }
    ItemsComponent.prototype.ngOnInit = function () {
        if (application_settings_1.hasKey("studyForms")) {
            this.forms = JSON.parse(application_settings_1.getString("studyForms"));
        }
        else {
            this.submit();
        }
    };
    ItemsComponent.prototype.submit = function () {
        var _this = this;
        this.itemService.getItems().subscribe(function (fields) {
            _this.forms = fields;
            application_settings_1.setString("studyForms", JSON.stringify(_this.forms));
        });
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
            styleUrls: ["./items.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBR2xELCtDQUE2QztBQUM3Qyw2REFBa0U7QUFRbEU7SUFHSSx3QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFENUMsVUFBSyxHQUFxQixFQUFFLENBQUM7SUFDbUIsQ0FBQztJQUVqRCxpQ0FBUSxHQUFSO1FBQ0UsRUFBRSxDQUFBLENBQUMsNkJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdDQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQUMsSUFBSSxDQUFBLENBQUM7WUFDTCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQUEsaUJBU0M7UUFQRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDakMsVUFBQSxNQUFNO1lBQ0YsS0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDcEIsZ0NBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQ0osQ0FBQztJQUVOLENBQUM7SUF0QlEsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFDLENBQUMsYUFBYSxDQUFDO1NBQzVCLENBQUM7eUNBSW1DLDBCQUFXO09BSG5DLGNBQWMsQ0F1QjFCO0lBQUQscUJBQUM7Q0FBQSxBQXZCRCxJQXVCQztBQXZCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBTdHVkeWZvcm0gfSBmcm9tICcuL3N0dWR5Zm9ybSc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHtnZXRTdHJpbmcsIHNldFN0cmluZywgaGFzS2V5fSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6W1wiLi9pdGVtcy5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgZm9ybXM6IEFycmF5PFN0dWR5Zm9ybT4gPSBbXTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgIGlmKGhhc0tleShcInN0dWR5Rm9ybXNcIikpe1xuICAgICAgICB0aGlzLmZvcm1zID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJzdHVkeUZvcm1zXCIpKTtcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgdGhpcy5zdWJtaXQoKTtcbiAgICAgIH0gICAgXG4gICAgfVxuXG4gICAgc3VibWl0KCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW1zKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgZmllbGRzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1zID0gZmllbGRzOyBcbiAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJzdHVkeUZvcm1zXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZm9ybXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgIH1cbn0iXX0=