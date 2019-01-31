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
import { LooseObject } from './looseobject';
import { REDCap } from "./redcap";
//import 'rxjs/add/operator/shareReplay';
import { getString, setString, hasKey} from "application-settings";
import { UserModel } from './user';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json' }) 
  };

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

    getRecordID(): Observable<any>{
      // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&fields=' + 'record_id';
      // return this.http.post<any>(Config.apiUrl,data,httpOptions); //.shareReplay();
      var redcap = JSON.parse(getString("server"));

      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&fields=' + 'record_id';
      return this.http.post<any>(redcap.url,data,httpOptions); //.shareReplay();
    }

    getUsers(): Observable<any>{

      // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&forms=' + 'registration' + '&filterLogic' + '[uuid] ='+ device.uuid;
      // return this.http.post<any>(Config.apiUrl,data,httpOptions); 
      var redcap = JSON.parse(getString("server"));

      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&forms=' + 'registration' + '&filterLogic=' + '[uuid]=\''+ device.uuid + '\'' ;

      return this.http.post<any>(redcap.url,data,httpOptions);

    }

    getUserData(user: UserModel, form_name:string ): Observable<any>{

      // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json'+ '&exportSurveyFields=' + 'true' + '&filterLogic=[' + form_name + '_observantid]='+ user.record_id;
      // return this.http.post<any>(Config.apiUrl,data,httpOptions); 
      var redcap = JSON.parse(getString("server"));

      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json'+ '&exportSurveyFields=' + 'true' + '&filterLogic=[' + form_name + '_observantid]='+ user.record_id;

      return this.http.post<any>(redcap.url,data,httpOptions);      
    }

    getFormInstanceData(form: string, record_id: string): Observable<any>{
      //var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&exportSurveyFields=' + 'true' +  '&fields=' + 'record_id' + '&forms=' + form;
      var redcap = JSON.parse(getString("server"));

      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&exportSurveyFields=' + 'true' +  '&fields=' + 'record_id' + '&forms=' + form;


      return this.http.post<any>(redcap.url,data,httpOptions).map(
      //return this.http.post<any>(Config.apiUrl,data,httpOptions).map(
        fields => {
          let forms = fields.filter( (e) => (e.record_id === record_id  && e.redcap_repeat_instrument === form) ) ;
          return forms;
        }

      );


    }

    saveData(formData: string): Observable<any>{
      // var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&overwriteBehavior=' + 'normal' + '&data=' + formData ;
      var redcap = JSON.parse(getString("server"));

      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' +  '&overwriteBehavior=' + 'normal' + '&data=' + formData ;
      
      //return this.http.post<any>(Config.apiUrl,data,httpOptions); //.shareReplay(); 
      return this.http.post<any>(redcap.url,data,httpOptions); //.shareReplay(); 
    }

    addProtocol(): Observable<any>{
      //var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'metadata' + '&returnFormat=' + 'json';
      //return this.http.post<Studymetadata[]>(Config.apiUrl,data,httpOptions); 
      var redcap = JSON.parse(getString("server"));

      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'metadata' + '&returnFormat=' + 'json';
      return this.http.post<Studymetadata[]>(redcap.url,data,httpOptions);

    }

    getInstruments(): LooseObject[] {

      //console.log("calling get Instruments ....");
      var redcap = JSON.parse(getString("server"));

      var instruments = new Array<LooseObject>();
      //var data = 'token=' + Config.token + '&format=' + 'json' + '&content=' + 'instrument' + '&returnFormat=' + 'json';
      var data = 'token=' + redcap.token + '&format=' + 'json' + '&content=' + 'instrument' + '&returnFormat=' + 'json';
      
     // this.http.post<any[]>(Config.apiUrl,data,httpOptions).subscribe(
      this.http.post<any[]>(redcap.url,data,httpOptions).subscribe(

        data=> {
          data.forEach(data_obj => {
            var obj = new LooseObject();
            obj.key = data_obj.instrument_name;
            obj.value = data_obj.instrument_label;

            instruments.push(obj);
          });
        }

      )
      
      return instruments;

    }

   createResponseOptions(select_choices_or_calculations: string): Responseoption[] {
      
        var options = new Array<Responseoption>();
        
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
          var x = xoptions[index].split(",");
          var response = new Responseoption();
          response.value = x[0].trim();

         
           var labeltext = "";
           for(var i =1; i < x.length; i++){
            labeltext = labeltext + x[i] + ",";
           } 

          response.label = labeltext;


          options.push(response);
        }
        return options;
    }

    createLabelOptions(select_choices_or_calculations: string): any[] {
      
        var options = [];
        
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
          var x = xoptions[index].split(",");


           var labeltext = "";
           for(var i =1; i < x.length; i++){
            labeltext = labeltext + x[i] + ",";
           } 

          options.push(labeltext);
          //options.push(x[1]);

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

    getItems() : Observable<Studyform[]> {

      var forms = new Array<Studyform>();

      var instruments = this.getInstruments();

      return this.addProtocol().map(
      fields => {

          for (let field of fields){

              if(field.form_name == 'registration'){
                continue;
              }

              if(field.field_annotation == '@HIDDEN'){
                continue;
              }
              var found = false;

              for(var i = 0; i < forms.length; i++) {
                if(forms[i].form_name == field.form_name){
                  found = true;
                  field.select_choices = this.createResponseOptions(field.select_choices_or_calculations);
                  field.select_labels = this.createLabelOptions(field.select_choices_or_calculations);
                  //field.yesno = this.createYesNo();

                  field.answer = "";
                  field.visibility = "visible";

                  forms[i].fields.push(field);
    
                  break;
                }
              }

              if(!found){
                var sf = new Studyform();
                sf.form_name = field.form_name;
                
                //search for the instrument label
                sf.form_label = instruments.filter(instrument => instrument.key === sf.form_name)[0].value;

                sf.fields = new Array();
                field.select_choices = this.createResponseOptions(field.select_choices_or_calculations);
                field.select_labels = this.createLabelOptions(field.select_choices_or_calculations);
                //field.yesno = this.createYesNo();

                field.answer = "";
                field.visibility = "visible";
                
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
