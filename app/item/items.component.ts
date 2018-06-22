import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Studyform } from './studyform';
import { ItemService } from "./item.service";
import {getString, setString, hasKey} from "application-settings";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls:["./items.css"]
})
export class ItemsComponent implements OnInit {

    forms: Array<Studyform> = [];
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
      if(hasKey("studyForms")){
        this.forms = JSON.parse(getString("studyForms"));
      } else{
        this.submit();
      }    
    }

    submit(){
        
        this.itemService.getItems().subscribe(
            fields => {
                this.forms = fields; 
                setString("studyForms", JSON.stringify(this.forms));
            }
        );

    }
}