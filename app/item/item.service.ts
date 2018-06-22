import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Studydata } from './studydata';
import { Studymetadata } from './studymetadata';
import { Responseoption } from './responseoption';
import { Studyform } from './studyform';
import { Config } from "./config";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { SegmentedBarItem } from "ui/segmented-bar";
import { device } from "platform";
//import 'rxjs/add/operator/shareReplay';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json' }) 
  };

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

    getRecordID(): Observable<any>{
      var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&fields=' + 'record_id';
      return this.http.post<any>(Config.apiUrl,data,httpOptions); //.shareReplay(); 
    }

    getUsers(): Observable<any>{

      var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&forms=' + 'registration' + '&filterLogic' + '[uuid] ='+ device.uuid;
      return this.http.post<any>(Config.apiUrl,data,httpOptions); 
    }

    saveData(formData: string): Observable<any>{
      var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&overwriteBehavior=' + 'normal' + '&data=' + formData ;
      return this.http.post<any>(Config.apiUrl,data,httpOptions); //.shareReplay(); 
    }

    addProtocol(): Observable<any>{
      var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'metadata' + '&returnFormat=' + 'json';
      return this.http.post<Studymetadata[]>(Config.apiUrl,data,httpOptions); 
    }

   createResponseOptions(select_choices_or_calculations: string): Responseoption[] {
      
        var options = new Array<Responseoption>();
        
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
          var x = xoptions[index].split(",");
          var response = new Responseoption();
          response.value = x[0];
          response.label = x[1];
          options.push(response);
        }
        return options;
    }

    createLabelOptions(select_choices_or_calculations: string): any[] {
      
        var options = [];
        
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
          var x = xoptions[index].split(",");
          options.push(x[1]);
        }
        return options;
    }

    createYesNo(): SegmentedBarItem[] {
        var myItems = [];
        for (let i = 1; i < 5; i++) {
            const item = new SegmentedBarItem();
            item.title = "Tab " + i;
            myItems.push(item);
        }
        return myItems;

    }

    getItems():  Observable<Studyform[]> {

        var forms = new Array<Studyform>()

        return this.addProtocol().map(
        fields => {

            for (let field of fields){

              if(field.form_name == 'registration'){
                continue;
              }

              var found = false;

              for(var i = 0; i < forms.length; i++) {
                if(forms[i].form_name == field.form_name){
                  found = true;
                  field.select_choices = this.createResponseOptions(field.select_choices_or_calculations);
                  field.select_labels = this.createLabelOptions(field.select_choices_or_calculations);
                  //field.yesno = this.createYesNo();
                  forms[i].fields.push(field);
                 // console.log("..pushing " + field.field_name);
                  break;
                }
              }

              if(!found){
                var sf = new Studyform();
                sf.form_name = field.form_name;
                sf.fields = new Array();

                field.select_choices = this.createResponseOptions(field.select_choices_or_calculations);
                field.select_labels = this.createLabelOptions(field.select_choices_or_calculations);
                //field.yesno = this.createYesNo();
                sf.fields.push(field);
                // console.log("..adding " + field.field_name); 
                forms.push(sf);
              }       
            }

            return forms; 

        });
    }

    /*
    getItem(id: string): Studyform {
        return this.forms.filter(form => form.form_name === id)[0];
    }
    */

    handleErrors(error: Response) {
      console.log(JSON.stringify(error.json()));
      //return Observable.throw(error);
  }
}
