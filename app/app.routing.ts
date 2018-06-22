import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { SettingsComponent } from "./item/settings.component";
import { SplashScreenComponent } from "./item/splashscreen.component";
import { UsersComponent } from "./item/users.component";

const routes: Routes = [
    { path: "", redirectTo: "/splashscreen", pathMatch: "full" },
    { path: "splashscreen", component: SplashScreenComponent },
    { path: "settings", component: SettingsComponent },
    { path: "forms", component: ItemsComponent },
    { path: "users", component: UsersComponent },
    { path: "form/:form_name", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }