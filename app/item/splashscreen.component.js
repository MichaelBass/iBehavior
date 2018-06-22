"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var application_settings_1 = require("application-settings");
var connectivity = require("connectivity");
var platform_1 = require("platform");
//const platformModule = require("tns-core-modules/platform");
var SplashScreenComponent = /** @class */ (function () {
    function SplashScreenComponent(itemService) {
        this.itemService = itemService;
    }
    SplashScreenComponent.prototype.ngOnInit = function () {
        if (!application_settings_1.hasKey("studyForms")) {
            this.itemService.getItems().subscribe(function (fields) {
                application_settings_1.setString("studyForms", JSON.stringify(fields));
            });
        }
        console.log(platform_1.device.model);
        console.log(platform_1.device.os);
        console.log(platform_1.device.osVersion);
        console.log(platform_1.device.uuid);
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                console.log("connectionType: None");
                break;
            case connectivity.connectionType.wifi:
                console.log("connectionType: Wi-Fi");
                break;
            case connectivity.connectionType.mobile:
                console.log("connectionType: Mobile");
                break;
            default:
                console.log("connectionType: default?");
                break;
        }
    };
    SplashScreenComponent = __decorate([
        core_1.Component({
            selector: "ns-splashscreen",
            moduleId: module.id,
            templateUrl: "./splashscreen.component.html",
            styleUrls: ["./splashscreen.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], SplashScreenComponent);
    return SplashScreenComponent;
}());
exports.SplashScreenComponent = SplashScreenComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsYXNoc2NyZWVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwbGFzaHNjcmVlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUQ7QUFDakQsK0NBQTZDO0FBQzdDLDZEQUF3RDtBQUN4RCwyQ0FBNkM7QUFDN0MscUNBQTREO0FBQzVELDhEQUE4RDtBQVE5RDtJQUdJLCtCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUUzQyxDQUFDO0lBRUYsd0NBQVEsR0FBUjtRQUVFLEVBQUUsQ0FBQSxDQUFDLENBQUMsNkJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQ2pDLFVBQUEsTUFBTTtnQkFDRixnQ0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUNKLENBQUM7UUFDSixDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR3pCLElBQUksY0FBYyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUk7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDckMsS0FBSyxDQUFDO1lBQ1YsS0FBSyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxDQUFDO1lBQ1Y7Z0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUM7UUFDZCxDQUFDO0lBR0QsQ0FBQztJQXhDUSxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFDLENBQUMsb0JBQW9CLENBQUM7U0FDbkMsQ0FBQzt5Q0FJbUMsMEJBQVc7T0FIbkMscUJBQXFCLENBMENqQztJQUFELDRCQUFDO0NBQUEsQUExQ0QsSUEwQ0M7QUExQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgc2V0U3RyaW5nLCBoYXNLZXl9IGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0ICogYXMgY29ubmVjdGl2aXR5IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MsIGRldmljZSwgc2NyZWVuIH0gZnJvbSBcInBsYXRmb3JtXCI7XG4vL2NvbnN0IHBsYXRmb3JtTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIik7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLXNwbGFzaHNjcmVlblwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zcGxhc2hzY3JlZW4uY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6W1wiLi9zcGxhc2hzY3JlZW4uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNwbGFzaFNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSkge1xuXG4gICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICBpZighaGFzS2V5KFwic3R1ZHlGb3Jtc1wiKSl7XG4gICAgICAgIHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBmaWVsZHMgPT4ge1xuICAgICAgICAgICAgICAgIHNldFN0cmluZyhcInN0dWR5Rm9ybXNcIiwgSlNPTi5zdHJpbmdpZnkoZmllbGRzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhkZXZpY2UubW9kZWwpO1xuICAgIGNvbnNvbGUubG9nKGRldmljZS5vcyk7XG4gICAgY29uc29sZS5sb2coZGV2aWNlLm9zVmVyc2lvbik7XG4gICAgY29uc29sZS5sb2coZGV2aWNlLnV1aWQpO1xuXG5cbiAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBjb25uZWN0aXZpdHkuZ2V0Q29ubmVjdGlvblR5cGUoKTtcbiAgICBzd2l0Y2ggKGNvbm5lY3Rpb25UeXBlKSB7XG4gICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLm5vbmU6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbm5lY3Rpb25UeXBlOiBOb25lXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgY29ubmVjdGl2aXR5LmNvbm5lY3Rpb25UeXBlLndpZmk6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbm5lY3Rpb25UeXBlOiBXaS1GaVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGNvbm5lY3Rpdml0eS5jb25uZWN0aW9uVHlwZS5tb2JpbGU6XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbm5lY3Rpb25UeXBlOiBNb2JpbGVcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGlvblR5cGU6IGRlZmF1bHQ/XCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG5cbiAgICB9XG5cbn0iXX0=