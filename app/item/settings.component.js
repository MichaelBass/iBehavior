"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("./config");
var redcap_1 = require("./redcap");
var ApplicationSettings = require("application-settings");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.redcap = new redcap_1.REDCap();
        this.redcap.url = config_1.Config.apiUrl;
        this.redcap.token = config_1.Config.token;
    };
    SettingsComponent.prototype.submit = function () {
        ApplicationSettings.setString("token", this.redcap.token);
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "ns-settings",
            moduleId: module.id,
            templateUrl: "./settings.component.html",
            styleUrls: ["./settings.css"]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBRWpELG1DQUFrQztBQUNsQyxtQ0FBa0M7QUFDbEMsMERBQTREO0FBUTVEO0lBSUk7SUFFQyxDQUFDO0lBRUYsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxlQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVELGtDQUFNLEdBQU47UUFDSSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQWhCUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBQyxDQUFDLGdCQUFnQixDQUFDO1NBQy9CLENBQUM7O09BQ1csaUJBQWlCLENBa0I3QjtJQUFELHdCQUFDO0NBQUEsQUFsQkQsSUFrQkM7QUFsQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgUkVEQ2FwIH0gZnJvbSBcIi4vcmVkY2FwXCI7XG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1zZXR0aW5nc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczpbXCIuL3NldHRpbmdzLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG4gICAgcmVkY2FwOiBSRURDYXA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWRjYXAgPSBuZXcgUkVEQ2FwKCk7XG4gICAgICAgIHRoaXMucmVkY2FwLnVybCA9IENvbmZpZy5hcGlVcmw7XG4gICAgICAgIHRoaXMucmVkY2FwLnRva2VuID0gQ29uZmlnLnRva2VuO1xuICAgIH1cblxuICAgIHN1Ym1pdCgpe1xuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldFN0cmluZyhcInRva2VuXCIsIHRoaXMucmVkY2FwLnRva2VuKTtcbiAgICB9XG5cbn0iXX0=