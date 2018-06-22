import { Component, OnInit} from "@angular/core";

import { Config } from "./config";
import { REDCap } from "./redcap";
import * as ApplicationSettings from "application-settings";

@Component({
    selector: "ns-settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls:["./settings.css"]
})
export class SettingsComponent implements OnInit {
    
    redcap: REDCap;

    constructor() {

     }

    ngOnInit(): void {
        this.redcap = new REDCap();
        this.redcap.url = Config.apiUrl;
        this.redcap.token = Config.token;
    }

    submit(){
        ApplicationSettings.setString("token", this.redcap.token);
    }

}