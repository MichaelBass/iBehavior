import { Component, OnInit, Input} from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { getString, setString, hasKey} from "application-settings";

import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { Studyform } from './studyform';
import { Studymetadata } from './studymetadata';
import { ItemService } from "./item.service";
import { device } from "platform";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
    styleUrls:["./item-detail.css"]
})

export class ItemDetailComponent implements OnInit {

    form: Studyform;
    fields: Studymetadata[];
    //fields: ObservableArray<Studymetadata>;
    forms: Studyform[];
 
    myForm : FormGroup;

    constructor(private route: ActivatedRoute, private itemService: ItemService) { }

    ngOnInit(): void {

       const id = this.route.snapshot.params["form_name"];

        this.forms = JSON.parse(getString("studyForms"));
        this.form = this.forms.filter(form => form.form_name === id)[0];
        this.fields = this.form.fields;

        //this.fields = new ObservableArray(this.form.fields);
        this.myForm = this.toFormGroup(this.form.fields);
    }

    parseResponses(response: string[]):string[] {
        var pattern = "{(.*)";
        for(var i=0; i < response.length; i++){
           if(response[i] != null){
                if(response[i].match(pattern) != null){
                    var search = "{" + response[i].match(pattern)[1];
                    response[i] = response[i].replace(search, "");
                }
            }
         }
         return response;

    }

    toFormGroup(questions: Studymetadata[] ) {
        let group: any = {};

        questions.forEach(question => {

            question.select_labels = this.parseResponses(question.select_labels);

            group[question.field_name] = new FormControl(question.field_name);
            group[question.field_name].value = "";
          
            if(question.field_name == "name"){
                group[question.field_name].value ="Enter your name";
            }

        });

        return new FormGroup(group);
    }

    getNextrecord_id(): Observable<any> {

        return this.itemService.getRecordID().map(
            fields => {
                if(fields.length == 0){
                    return 1;
                }else{
                    return Math.max.apply(Math,fields.map(function(o){return o.record_id;})) + 1;
                }
            }
        );
    }

    saveRegistration(){
        this.getNextrecord_id().subscribe(
            fields => {
                this.myForm.value.record_id = fields;
                this.myForm.value.uuid = device.uuid;
                var myPackage =[];
                myPackage.push(this.myForm.value);

                this.itemService.saveData( JSON.stringify(myPackage) ).subscribe(
                    fields => {

                    if(fields.count == 1){
                      var users =[];  
                      if(hasKey("Users")){
                        users = JSON.parse(getString("Users"));
                      } 
                      var user = JSON.parse( "{\"record_id\":\"" + fields + "\",\"name\":\"" + this.myForm.value.name + "\",\"uuid\":\"" + device.uuid + "\"active\":false}"  );
                      users.push(user);
                      setString("Users", JSON.stringify(users));
                    }


                    }
                );   
            }
        );
    }

    submit() {
        if(this.form.form_name == "registration"){
            this.saveRegistration();
        }
    }

}
