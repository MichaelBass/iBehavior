import { Component, OnInit, DoCheck} from "@angular/core";
import {Router} from "@angular/router";
import { ItemService } from "./item.service";
import { CacheService } from "./cache.service";
import { getString, setString, hasKey} from "application-settings";
import * as connectivity from "connectivity";
import { isAndroid, isIOS, device, screen } from "platform";
//const platformModule = require("tns-core-modules/platform");
import * as dialogs from "ui/dialogs";
import { Config } from "./config";
import { REDCap } from "./redcap";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './user';

import { EventData } from "data/observable";

@Component({
    selector: "ns-splashscreen",
    moduleId: module.id,
    templateUrl: "./splashscreen.component.html",
    styleUrls:["./splashscreen-common.css","./splashscreen.css"]
})
export class SplashScreenComponent implements OnInit, DoCheck{
    
    instructions: string;
    server: string;

    redcap: REDCap;
    redcapColor: string;
    activeREDCap: string;

    user : UserModel;
    userColor : string;
    activeuser: string;
    currentUser: string;

    constructor(private itemService: ItemService, private router: Router, private http: HttpClient, private cacheService: CacheService) {

    }

    ngDoCheck(): void {
        this.instructions = "Welcome to iBehavior, there are a few things that you need to do before we begin:"


        if(!hasKey("server")){
            this.server = "You will need to specify where your data will be sent. Click on the Settings and click the Download button to enter the study code that you were provided.  If you do not have a study code enter 'test'."
            this.redcapColor = "red";
            
        }else{
            this.server = "";
            this.redcap = JSON.parse(getString("server"));
            this.redcapColor = "green";
            this.activeREDCap = this.redcap.name;
        }

        if(!hasKey("ActiveUser")){
            this.activeuser = "You will need to set a user as active. Click on the Mange User and either create or select an user and make him/her active."
            this.userColor = "red";
        }else{
            this.activeuser = "";
            this.user = JSON.parse(getString("ActiveUser"));
            this.currentUser = this.user.name;
            this.userColor = "green";
        }

    }

    ngOnInit(): void {

        this.redcap = new REDCap();
        this.redcap.name = "";
        this.redcap.url = "";
        this.redcap.token = "";

/*
        console.log(device.model);
        console.log(device.os);
        console.log(device.osVersion);
        console.log(device.uuid);
*/

        let connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                //console.log("connectionType: None");
                break;
            case connectivity.connectionType.wifi:
                //console.log("connectionType: Wi-Fi");
                break;
            case connectivity.connectionType.mobile:
                //console.log("connectionType: Mobile");
                break;
            default:
                //console.log("connectionType: default?");
                break;
        }


        if(hasKey("cacheResponse") && (connectionType == connectivity.connectionType.wifi)){
            var myPackage = JSON.parse(getString("cacheResponse"));
            for(var i=0; i < myPackage.length; i++){
                this.cacheService.uploadCachedData(myPackage[i]);
            }
        }
    }

    onResetCache(args){
        this.cacheService.resetCache();
    }

    onViewCache(args){
        let options = {
            title: "cache",
            message: getString("cacheResponse"),
            okButtonText: "OK"
        };
        alert(options);
    }

    onSettings(args){

        dialogs.prompt({
        title: "Configuration",
        message: "Please enter your study code",
        okButtonText: "Done",
        cancelButtonText: "Cancel",
        inputType: dialogs.inputType.text
        }).then(r => {

            if(r.result){
                this.http.get<any>(Config.server + "/iBehavior/Config/" + r.text ).subscribe(
                fields => {
                    //console.log(fields);
                    this.redcap.name = fields[0].NAME;
                    this.redcap.assessment_time = fields[1].ASSESSMENT_TIME;
                    this.redcap.url = fields[2].URL;
                    this.redcap.token = fields[3].TOKEN;
                    

                    setString("server", JSON.stringify( this.redcap ));
                },
                error => console.log(error.message));
            }
        });

    }

}