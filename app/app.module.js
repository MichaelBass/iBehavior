"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var app_store_1 = require("./app.store");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var item_service_1 = require("./item/item.service");
var cache_service_1 = require("./item/cache.service");
var calendar_service_1 = require("./item/calendar.service");
var items_component_1 = require("./item/items.component");
var item_detail_component_1 = require("./item/item-detail.component");
var item_detail2_component_1 = require("./item/item-detail2.component");
var splashscreen_component_1 = require("./item/splashscreen.component");
var users_component_1 = require("./item/users.component");
var data_component_1 = require("./item/data.component");
var schedule_component_1 = require("./item/schedule.component");
var hint_1 = require("./item/hint");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-ui-calendar/angular");
var forms_2 = require("@angular/forms");
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
var http_1 = require("nativescript-angular/http");
var http_2 = require("@angular/common/http");
var angular_2 = require("nativescript-ui-listview/angular");
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [hint_1.HintComponent],
            imports: [
                nativescript_module_1.NativeScriptModule,
                http_1.NativeScriptHttpModule,
                forms_1.NativeScriptFormsModule,
                angular_1.NativeScriptUICalendarModule,
                forms_2.ReactiveFormsModule,
                http_2.HttpClientModule,
                app_routing_1.AppRoutingModule,
                angular_2.NativeScriptUIListViewModule
            ],
            declarations: [
                app_component_1.AppComponent,
                items_component_1.ItemsComponent,
                item_detail_component_1.ItemDetailComponent,
                item_detail2_component_1.ItemDetail2Component,
                hint_1.HintComponent,
                splashscreen_component_1.SplashScreenComponent,
                users_component_1.UsersComponent,
                data_component_1.DataComponent,
                schedule_component_1.ScheduleComponent
            ],
            providers: [
                item_service_1.ItemService,
                cache_service_1.CacheService,
                calendar_service_1.CalendarService,
                modal_dialog_1.ModalDialogService,
                app_store_1.appStoreProviders
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
