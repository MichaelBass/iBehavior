import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { appStoreProviders } from './app.store';


import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { ItemService } from "./item/item.service";
import { CacheService } from "./item/cache.service";
import { CalendarService } from "./item/calendar.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { ItemDetail2Component } from "./item/item-detail2.component";
import { SplashScreenComponent } from "./item/splashscreen.component";
import { UsersComponent } from "./item/users.component";
import { DataComponent } from "./item/data.component";
import { ScheduleComponent } from "./item/schedule.component";
import { HintComponent } from "./item/hint";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";

import { ReactiveFormsModule } from '@angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { HttpClientModule } from '@angular/common/http';

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";


@NgModule({
    bootstrap: [AppComponent],
    entryComponents: [HintComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptUICalendarModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        ItemDetail2Component,
        HintComponent,
        SplashScreenComponent,
        UsersComponent,
        DataComponent,
        ScheduleComponent
    ],
    providers: [
        ItemService,
        CacheService,
        CalendarService,
        ModalDialogService,
        appStoreProviders
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
