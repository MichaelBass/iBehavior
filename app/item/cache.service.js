"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("./item.service");
var application_settings_1 = require("application-settings");
var CacheService = /** @class */ (function () {
    function CacheService(itemService) {
        this.itemService = itemService;
    }
    CacheService.prototype.removeData = function (data, form_name) {
        if (application_settings_1.hasKey("cacheResponse")) {
            var myPackage = JSON.parse(application_settings_1.getString("cacheResponse"));
            for (var i = 0; i < myPackage.length; i++) {
                if (myPackage[i]["redcap_repeat_instrument"] == data["redcap_repeat_instrument"] && myPackage[i]["redcap_repeat_instance"] == data["redcap_repeat_instance"] && myPackage[i][form_name + "_observantid"] == data[form_name + "_observantid"]) {
                    //console.log("removing: " + myPackage[i][form_name + "_observantid"] + ":" + myPackage[i]["redcap_repeat_instrument"] + "(" + myPackage[i]["redcap_repeat_instance"] + ")" );
                    myPackage.splice(i, 1);
                    application_settings_1.setString("cacheResponse", JSON.stringify(myPackage));
                }
            }
        }
    };
    CacheService.prototype.addData = function (user, form, form_name) {
        var data = form.value;
        var _schedules = user.schedule.filter(function (schedule) { return schedule.redcap_repeat_instrument === form_name; });
        //console.log("adding CachedData for " + _schedules[0].redcap_repeat_instrument + "(" + _schedules[0].redcap_repeat_instance.toString() + ")" );
        var obj = {};
        obj.record_id = user.record_id;
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            if (data[key] != "") {
                obj[key] = data[key];
                if (data[key] == -1) {
                    obj[key] = 0;
                }
            }
        }
        obj["redcap_repeat_instrument"] = _schedules[0].redcap_repeat_instrument;
        obj["redcap_repeat_instance"] = _schedules[0].redcap_repeat_instance.toString();
        obj[form_name + "_observantid"] = user.record_id;
        obj[form_name + "_date_entered"] = new Date().toLocaleString();
        if (application_settings_1.hasKey("cacheResponse")) {
            var myPackage = JSON.parse(application_settings_1.getString("cacheResponse"));
            for (var i = 0; i < myPackage.length; i++) {
                if (myPackage[i]["redcap_repeat_instrument"] == obj["redcap_repeat_instrument"] && myPackage[i]["redcap_repeat_instance"] == obj["redcap_repeat_instance"] && myPackage[i][form_name + "_observantid"] == obj[form_name + "_observantid"]) {
                    myPackage[i] = obj;
                }
                else {
                    myPackage.push(obj);
                }
            }
            if (myPackage.length == 0) {
                myPackage.push(obj);
            }
            application_settings_1.setString("cacheResponse", JSON.stringify(myPackage));
        }
        else {
            application_settings_1.setString("cacheResponse", "[]");
        }
    };
    CacheService.prototype.resetCache = function () {
        //console.log("resetting Cache");
        application_settings_1.setString("cacheResponse", "[]");
    };
    CacheService.prototype.viewCache = function () {
        console.log(application_settings_1.getString("cacheResponse"));
    };
    CacheService.prototype.uploadCachedData = function (_myData) {
        //console.log("uploading CachedData");
        var _this = this;
        this.itemService.saveData("[" + JSON.stringify(_myData) + "]").subscribe(function (fields) {
            //var obj: LooseObject2 = {};
            _this.removeData(_myData, _myData["redcap_repeat_instrument"]);
        });
        /*
              if(hasKey("cacheResponse")){
                var myPackage = JSON.parse(getString("cacheResponse"));
                for(var i=0; i < myPackage.length; i++){
        
                  var _myData = JSON.stringify(myPackage[i]);
            
        
                  if(myPackage[i]["redcap_repeat_instrument"] != form_name){
                    console.log(myPackage[i]["redcap_repeat_instrument"] +" does not equal "+ form_name);
                    continue;
                  }
        
                    this.itemService.saveData("[" +  _myData + "]" ).subscribe(
                      fields => {
                        //var obj: LooseObject2 = {};
                        this.removeData( JSON.parse(_myData), form_name );
                      }
                    );
                }
              }
        */
    };
    CacheService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [item_service_1.ItemService])
    ], CacheService);
    return CacheService;
}());
exports.CacheService = CacheService;
