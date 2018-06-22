import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import { TextView } from "ui/text-view";
import { Switch } from "ui/switch";
import {getString, setString, remove, hasKey} from "application-settings";
import { ItemService } from "./item.service";
import { device } from "platform";
import { Observable } from "rxjs/Observable";

class User {
    constructor(public record_id: string, public name: string, public uuid: string, public active: boolean) { }
}

@Component({
    selector: "ns-users",
    moduleId: module.id,
    templateUrl: "./users.component.html",
    styleUrls:["./users.css"]
})

export class UsersComponent implements OnInit {

    public users: Array<User>;
    public userName : string;
    public editState = true;
    
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {

      if(hasKey("Users")){
        this.users = JSON.parse(getString("Users"));
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
           this.users.push(new User( filtered_user[i].record_id, filtered_user[i].name, filtered_user[i].uuid, false)); 
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
