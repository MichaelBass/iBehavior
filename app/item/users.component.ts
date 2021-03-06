import {Component, OnInit, Input, ChangeDetectionStrategy, Inject} from "@angular/core";
import { TextView } from "ui/text-view";
import { Switch } from "ui/switch";
import * as LabelModule from "tns-core-modules/ui/label";
import {getString, setString, remove, hasKey} from "application-settings";
import { ItemService } from "./item.service";
import { device } from "platform";
import { Observable } from "rxjs/Observable";

import { Store } from 'redux';
import { AppStore } from '../app.store';
import { AppState } from '../app.state';
import * as UserActions from '../user.actions';
import { UserModel } from './user';


@Component({
    selector: "ns-users",
    moduleId: module.id,
    templateUrl: "./users.component.html",
    styleUrls:["./users.css"]
})

export class UsersComponent implements OnInit {

    public users: Array<UserModel>;
    public userName : string;
    public editState = true;
    currentuser : UserModel;


    constructor(@Inject(AppStore) private store: Store<AppState>, private itemService: ItemService) { }

    ngOnInit(): void {

      if(hasKey("Users")){
        this.users = JSON.parse(getString("Users"));

        for (var i = 0, len = this.users.length; i < len; i++) {

          if(hasKey("ActiveUser")){
            this.currentuser = JSON.parse(getString("ActiveUser"));
            if(this.users[i].record_id == this.currentuser.record_id){
              this.users[i].active = true; 
            }
          }
           
        }



      }else{
        this.users =[];
      }
    }

    clearUsers() {
      remove("Users");
      this.users =[];
    }
    
    refreshUsers() {

      this.itemService.getUsers().subscribe(
        fields => {

          let filtered_user = fields.filter((a) => a.uuid === device.uuid );
          this.users =[];
          for (var i = 0, len = filtered_user.length; i < len; i++) {

            var _user = new UserModel();
            _user.record_id = filtered_user[i].record_id;
            _user.name = filtered_user[i].name;
            _user.uuid = filtered_user[i].uuid;
            _user.schedule =[];
            _user.active = false;
            this.users.push(_user);

           //this.users.push(new UserModel( filtered_user[i].record_id, filtered_user[i].name, filtered_user[i].uuid, false)); 
          }
          setString("Users", JSON.stringify(this.users));

        }
      );
    }

    public onItemTap(args) {
        for (var i = 0, len = this.users.length; i < len; i++) {
           this.users[i].active = false; 
        }
        this.users[args.index].active = true;
        this.users[args.index].schedule = [];
        //this.store.dispatch(UserActions.create_user(this.users[args.index]));

        setString("ActiveUser", JSON.stringify(this.users[args.index]));

        args.object.refresh();
    }

    submit(args) {
        let textview: TextView = <TextView>args.object;
        this.saveRegistration(textview.text, textview);
    }

    saveRegistration(user: string, textview: TextView){
        this.getNextrecord_id().subscribe(
            fields => {

                var new_user = JSON.parse( "{\"record_id\":\"" + fields + "\",\"name\":\"" + user + "\",\"uuid\":\"" + device.uuid + "\"}"  );

                var myPackage =[];
                myPackage.push(new_user);

                this.itemService.saveData( JSON.stringify(myPackage) ).subscribe(
                    fields => {
                    if(fields.count == 1){
                      this.refreshUsers()
                      textview.text="";
                    }

                    }
                );   
            }
        );
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

}
