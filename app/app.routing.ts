import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { ItemDetail2Component } from "./item/item-detail2.component";
import { SplashScreenComponent } from "./item/splashscreen.component";
import { UsersComponent } from "./item/users.component";
import { DataComponent } from "./item/data.component";
import { ScheduleComponent } from "./item/schedule.component";

const routes: Routes = [
    { path: "", redirectTo: "/splashscreen", pathMatch: "full" },
    { path: "splashscreen", component: SplashScreenComponent },
    { path: "forms", component: ItemsComponent },
    { path: "users", component: UsersComponent },
    { path: "form/:form_name", component: ItemDetailComponent },
    { path: "form/:form_name/:position", component: ItemDetailComponent },
    { path: "form2/:form_name", component: ItemDetail2Component },
    { path: "form2/:form_name/:position", component: ItemDetail2Component },
    { path: "data", component: DataComponent },
    { path: "schedule", component: ScheduleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }