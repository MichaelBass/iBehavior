import { Component, OnInit} from "@angular/core";
import { ItemService } from "./item.service";
import { setString, hasKey} from "application-settings";
import * as connectivity from "connectivity";
import { isAndroid, isIOS, device, screen } from "platform";
//const platformModule = require("tns-core-modules/platform");

@Component({
    selector: "ns-splashscreen",
    moduleId: module.id,
    templateUrl: "./splashscreen.component.html",
    styleUrls:["./splashscreen.css"]
})
export class SplashScreenComponent implements OnInit {
    

    constructor(private itemService: ItemService) {

     }

    ngOnInit(): void {

      if(!hasKey("studyForms")){
        this.itemService.getItems().subscribe(
            fields => {
                setString("studyForms", JSON.stringify(fields));
            }
        );
      }

    console.log(device.model);
    console.log(device.os);
    console.log(device.osVersion);
    console.log(device.uuid);


    let connectionType = connectivity.getConnectionType();
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


    }

}