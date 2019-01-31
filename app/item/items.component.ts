import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Studyform } from './studyform';
import { Studymetadata } from './studymetadata';
import { ItemService } from "./item.service";
import {RouterExtensions} from "nativescript-angular/router";
import * as dialogs from "ui/dialogs";


import { Store } from 'redux';
import { AppStore } from '../app.store';
import { AppState } from '../app.state';
import * as UserActions from '../user.actions';
import { UserModel } from './user';
import { Schedule } from './schedule';

import {getString, setString, hasKey} from "application-settings";
import { REDCap } from "./redcap";

interface LooseObject {
    [key: string]: any
}

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls:["./items.css"]
})
export class ItemsComponent implements OnInit {

    forms: Array<Studyform> = [];
    form: Studyform;
    fields: Studymetadata[];
    user : UserModel;
    schedule : Schedule;
    redcap: REDCap;


    constructor(@Inject(AppStore) private store: Store<AppState>, private itemService: ItemService, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

        if(!hasKey("server")){

            let options = {
                title: "Settings",
                message: "Setting have not been configured!",
                okButtonText: "OK"
            };
            alert(options);

        }else{
            this.redcap = JSON.parse(getString("server"));
        }


        if(hasKey("studyForms")){
            this.forms = JSON.parse(getString("studyForms"));
        } else{
            this.submit();
        } 

        if(hasKey("ActiveUser")){
           this.user = JSON.parse(getString("ActiveUser"));
        //}else{
        //    this.user = this.store.getState().user; 
        }   
    }

    setSchedule(): Schedule{

        var window = parseInt(this.redcap.assessment_time); // 30*1000; //24*60*60*1000;
        var _schedules = this.user.schedule.filter(schedule => schedule.redcap_repeat_instrument === this.form.form_name);
        if(_schedules.length == 0){// add form to schedule

            //console.log("no schedule exists: " + this.form.form_name + " : " + this.user.name );
            var form_schedule = new Schedule();
            form_schedule.redcap_repeat_instance = 1;
            form_schedule.redcap_repeat_instrument = this.form.form_name;
            form_schedule.start = new Date();
            form_schedule.end = new Date(form_schedule.start.getTime() + window);

            this.user.schedule.push(form_schedule);
            _schedules = this.user.schedule.filter(schedule => schedule.redcap_repeat_instrument === this.form.form_name);
        } 

        var currentDate = new Date();
        if (currentDate > new Date(_schedules[0].start) && currentDate > new Date(_schedules[0].end)){
            //console.log("Increment instance" + this.form.form_name + " : " + this.user.name);
            _schedules[0].redcap_repeat_instance +=1;
            _schedules[0].start = new Date();
            _schedules[0].end = new Date(_schedules[0].start.getTime() + window);

            this.user.schedule = this.user.schedule.map(obj => _schedules.find(o => o.redcap_repeat_instrument === obj.redcap_repeat_instrument) || obj);

        }
        setString("ActiveUser", JSON.stringify(this.user));
        //this.store.dispatch(UserActions.create_user(this.user));
        
        return _schedules[0];

    }

    onConfirm(args){

        this.form = this.forms.filter(form => form.form_name === this.forms[args.index].form_name)[0];
        this.fields = this.form.fields;

        // var _title = this.form.fields[0].field_label.replace("[name]", this.user.name );
        // var _field_name = this.form.fields[0].field_name;

        this.schedule = this.setSchedule();

        this.flipToNextPage();
        
/*
        dialogs.action({
            title: this.forms[0].form_label,
            message: _title,
            actions: ["Yes", "No"]
            
        }).then(result => {
            if(result === "Yes"){
                var data = JSON.parse("{\"" + _field_name + "\":1}");
                //this.saveFormData(data);

                args.view.backgroundColor ="green";
                this.flipToNextPage();
            }else{
                var data = JSON.parse("{\"" + _field_name + "\":0}");
                //this.saveFormData(data);
                args.view.backgroundColor ="red";
            }
        });
*/

    }

    submit(){
        
        this.itemService.getItems().subscribe(
            fields => {
                this.forms = fields; 
                setString("studyForms", JSON.stringify(this.forms));

                let options = {
                    title: "Form List",
                    message: this.forms.length + " form(s) updated.",
                    okButtonText: "OK"
                };
                alert(options);
            }

        );
    }

    flipToNextPage() {
        this.routerExtensions.navigate(["/form", this.form.form_name], {
        transition: {
            name: "flip",
            duration: 400,
            curve: "linear"
        }
        });
    }

    saveFormData(data: any){

        var obj: LooseObject = {};
        obj.record_id = this.user.record_id;

        for (let key of Object.keys(data)) {
            obj[key] = data[key]; 
        } 
        obj["redcap_repeat_instrument"] = this.schedule.redcap_repeat_instrument;
        obj["redcap_repeat_instance"] = this.schedule.redcap_repeat_instance.toString();
        setString("redcap_repeat_instance", obj["redcap_repeat_instance"] );

        //tag each record with an user-defined record-id so data can be pulled with filterLogic.
        obj["observantid"] = this.user.record_id;
        obj["date_entered"] = new Date().toLocaleString();
        var myPackage =[];
        myPackage.push(obj);

        this.itemService.saveData( JSON.stringify(myPackage) ).subscribe(
            fields => {
                //console.log(fields);  
            }
        );

/*

        this.itemService.getFormInstanceData(this.form.form_name, this.user.record_id).subscribe(
            fields =>{

                var instance = 0;
                if(fields.length>0){
                    instance = parseInt(fields[fields.length -1].redcap_repeat_instance);
                }

                var obj: LooseObject = {};
                obj.record_id = this.user.record_id;

                for (let key of Object.keys(data)) {
                    obj[key] = data[key]; 
                } 

                // increment instance if not first time administered
                if (!isNaN(instance)) {
                    obj["redcap_repeat_instrument"] = this.form.form_name;
                    obj["redcap_repeat_instance"] = instance + 1;
                }else{
                    obj["redcap_repeat_instrument"] = this.form.form_name;
                    obj["redcap_repeat_instance"] = 1;
                }

                setString("redcap_repeat_instance", obj["redcap_repeat_instance"] );
                //console.log("redcap_repeat_instance" + ":" + obj["redcap_repeat_instance"]);

                //tag each record with an user-defined record-id so data can be pulled with filterLogic.
                obj["observantid"] = this.user.record_id;
                obj["date_entered"] = new Date().toLocaleString();
                var myPackage =[];
                myPackage.push(obj);
                //console.log(myPackage);

                this.itemService.saveData( JSON.stringify(myPackage) ).subscribe(
                    fields => {
                        console.log(fields);  
                    }
                );
            }
        );
*/


    }


}