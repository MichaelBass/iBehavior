"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var items_component_1 = require("./item/items.component");
var item_detail_component_1 = require("./item/item-detail.component");
var item_detail2_component_1 = require("./item/item-detail2.component");
var splashscreen_component_1 = require("./item/splashscreen.component");
var users_component_1 = require("./item/users.component");
var data_component_1 = require("./item/data.component");
var schedule_component_1 = require("./item/schedule.component");
var routes = [
    { path: "", redirectTo: "/splashscreen", pathMatch: "full" },
    { path: "splashscreen", component: splashscreen_component_1.SplashScreenComponent },
    { path: "forms", component: items_component_1.ItemsComponent },
    { path: "users", component: users_component_1.UsersComponent },
    { path: "form/:form_name", component: item_detail_component_1.ItemDetailComponent },
    { path: "form/:form_name/:position", component: item_detail_component_1.ItemDetailComponent },
    { path: "form2/:form_name", component: item_detail2_component_1.ItemDetail2Component },
    { path: "form2/:form_name/:position", component: item_detail2_component_1.ItemDetail2Component },
    { path: "data", component: data_component_1.DataComponent },
    { path: "schedule", component: schedule_component_1.ScheduleComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
