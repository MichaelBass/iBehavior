"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var responseoption_1 = require("./responseoption");
var studyform_1 = require("./studyform");
var config_1 = require("./config");
require("rxjs/add/operator/map");
var segmented_bar_1 = require("ui/segmented-bar");
var platform_1 = require("platform");
//import 'rxjs/add/operator/shareReplay';
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' })
};
var ItemService = /** @class */ (function () {
    function ItemService(http) {
        this.http = http;
    }
    ItemService.prototype.getRecordID = function () {
        var data = 'token=' + config_1.Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&fields=' + 'record_id';
        return this.http.post(config_1.Config.apiUrl, data, httpOptions); //.shareReplay(); 
    };
    ItemService.prototype.getUsers = function () {
        var data = 'token=' + config_1.Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&forms=' + 'registration' + '&filterLogic' + '[uuid] =' + platform_1.device.uuid;
        return this.http.post(config_1.Config.apiUrl, data, httpOptions);
    };
    ItemService.prototype.saveData = function (formData) {
        var data = 'token=' + config_1.Config.token + '&format=' + 'json' + '&content=' + 'record' + '&returnFormat=' + 'json' + '&type=' + 'flat' + '&overwriteBehavior=' + 'normal' + '&data=' + formData;
        return this.http.post(config_1.Config.apiUrl, data, httpOptions); //.shareReplay(); 
    };
    ItemService.prototype.addProtocol = function () {
        var data = 'token=' + config_1.Config.token + '&format=' + 'json' + '&content=' + 'metadata' + '&returnFormat=' + 'json';
        return this.http.post(config_1.Config.apiUrl, data, httpOptions);
    };
    ItemService.prototype.createResponseOptions = function (select_choices_or_calculations) {
        var options = new Array();
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
            var x = xoptions[index].split(",");
            var response = new responseoption_1.Responseoption();
            response.value = x[0];
            response.label = x[1];
            options.push(response);
        }
        return options;
    };
    ItemService.prototype.createLabelOptions = function (select_choices_or_calculations) {
        var options = [];
        var xoptions = select_choices_or_calculations.split("|");
        for (var index = 0; index < xoptions.length; ++index) {
            var x = xoptions[index].split(",");
            options.push(x[1]);
        }
        return options;
    };
    ItemService.prototype.createYesNo = function () {
        var myItems = [];
        for (var i = 1; i < 5; i++) {
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = "Tab " + i;
            myItems.push(item);
        }
        return myItems;
    };
    ItemService.prototype.getItems = function () {
        var _this = this;
        var forms = new Array();
        return this.addProtocol().map(function (fields) {
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var field = fields_1[_i];
                if (field.form_name == 'registration') {
                    continue;
                }
                var found = false;
                for (var i = 0; i < forms.length; i++) {
                    if (forms[i].form_name == field.form_name) {
                        found = true;
                        field.select_choices = _this.createResponseOptions(field.select_choices_or_calculations);
                        field.select_labels = _this.createLabelOptions(field.select_choices_or_calculations);
                        //field.yesno = this.createYesNo();
                        forms[i].fields.push(field);
                        // console.log("..pushing " + field.field_name);
                        break;
                    }
                }
                if (!found) {
                    var sf = new studyform_1.Studyform();
                    sf.form_name = field.form_name;
                    sf.fields = new Array();
                    field.select_choices = _this.createResponseOptions(field.select_choices_or_calculations);
                    field.select_labels = _this.createLabelOptions(field.select_choices_or_calculations);
                    //field.yesno = this.createYesNo();
                    sf.fields.push(field);
                    // console.log("..adding " + field.field_name); 
                    forms.push(sf);
                }
            }
            return forms;
        });
    };
    /*
    getItem(id: string): Studyform {
        return this.forms.filter(form => form.form_name === id)[0];
    }
    */
    ItemService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        //return Observable.throw(error);
    };
    ItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUErRDtBQUkvRCxtREFBa0Q7QUFDbEQseUNBQXdDO0FBQ3hDLG1DQUFrQztBQUdsQyxpQ0FBK0I7QUFDL0Isa0RBQW9EO0FBQ3BELHFDQUFrQztBQUNsQyx5Q0FBeUM7QUFFdkMsSUFBTSxXQUFXLEdBQUc7SUFDbEIsT0FBTyxFQUFFLElBQUksa0JBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQyxRQUFRLEVBQUMsa0JBQWtCLEVBQUUsQ0FBQztDQUM5RyxDQUFDO0FBR0o7SUFFRSxxQkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFdkMsaUNBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxHQUFHLFFBQVEsR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxNQUFNLEdBQUcsV0FBVyxHQUFHLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBSSxVQUFVLEdBQUcsV0FBVyxDQUFDO1FBQzlKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBTSxlQUFNLENBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtJQUNoRixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUVFLElBQUksSUFBSSxHQUFHLFFBQVEsR0FBRyxlQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxNQUFNLEdBQUcsV0FBVyxHQUFHLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsY0FBYyxHQUFHLGNBQWMsR0FBRyxVQUFVLEdBQUUsaUJBQU0sQ0FBQyxJQUFJLENBQUM7UUFDMU0s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QUVELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztvQkFDVCxJQUFJLEVBQUUsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztvQkFDekIsRUFBRSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUMvQixFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBRXhCLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO29CQUN4RixLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztvQkFDcEYsbUNBQW1DO29CQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEIsZ0RBQWdEO29CQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixDQUFDO2FBQ0Y7WUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRWpCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O01BSUU7SUFFRixrQ0FBWSxHQUFaLFVBQWEsS0FBZTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQyxpQ0FBaUM7SUFDckMsQ0FBQztJQXRIVSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBR2UsaUJBQVU7T0FGekIsV0FBVyxDQXVIdkI7SUFBRCxrQkFBQztDQUFBLEFBdkhELElBdUhDO0FBdkhZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBTdHVkeWRhdGEgfSBmcm9tICcuL3N0dWR5ZGF0YSc7XG5pbXBvcnQgeyBTdHVkeW1ldGFkYXRhIH0gZnJvbSAnLi9zdHVkeW1ldGFkYXRhJztcbmltcG9ydCB7IFJlc3BvbnNlb3B0aW9uIH0gZnJvbSAnLi9yZXNwb25zZW9wdGlvbic7XG5pbXBvcnQgeyBTdHVkeWZvcm0gfSBmcm9tICcuL3N0dWR5Zm9ybSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0IHsgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwicGxhdGZvcm1cIjtcbi8vaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9zaGFyZVJlcGxheSc7XG5cbiAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCdBY2NlcHQnOidhcHBsaWNhdGlvbi9qc29uJyB9KSBcbiAgfTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEl0ZW1TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgZ2V0UmVjb3JkSUQoKTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgdmFyIGRhdGEgPSAndG9rZW49JyArIENvbmZpZy50b2tlbiArICcmZm9ybWF0PScgKyAnanNvbicgKyAnJmNvbnRlbnQ9JyArICdyZWNvcmQnICsgJyZyZXR1cm5Gb3JtYXQ9JyArICdqc29uJyArICcmdHlwZT0nICsgJ2ZsYXQnICsgICcmZmllbGRzPScgKyAncmVjb3JkX2lkJztcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxhbnk+KENvbmZpZy5hcGlVcmwsZGF0YSxodHRwT3B0aW9ucyk7IC8vLnNoYXJlUmVwbGF5KCk7IFxuICAgIH1cblxuICAgIGdldFVzZXJzKCk6IE9ic2VydmFibGU8YW55PntcblxuICAgICAgdmFyIGRhdGEgPSAndG9rZW49JyArIENvbmZpZy50b2tlbiArICcmZm9ybWF0PScgKyAnanNvbicgKyAnJmNvbnRlbnQ9JyArICdyZWNvcmQnICsgJyZyZXR1cm5Gb3JtYXQ9JyArICdqc29uJyArICcmdHlwZT0nICsgJ2ZsYXQnICsgJyZmb3Jtcz0nICsgJ3JlZ2lzdHJhdGlvbicgKyAnJmZpbHRlckxvZ2ljJyArICdbdXVpZF0gPScrIGRldmljZS51dWlkO1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oQ29uZmlnLmFwaVVybCxkYXRhLGh0dHBPcHRpb25zKTsgXG4gICAgfVxuXG4gICAgc2F2ZURhdGEoZm9ybURhdGE6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICAgIHZhciBkYXRhID0gJ3Rva2VuPScgKyBDb25maWcudG9rZW4gKyAnJmZvcm1hdD0nICsgJ2pzb24nICsgJyZjb250ZW50PScgKyAncmVjb3JkJyArICcmcmV0dXJuRm9ybWF0PScgKyAnanNvbicgKyAnJnR5cGU9JyArICdmbGF0JyArICAnJm92ZXJ3cml0ZUJlaGF2aW9yPScgKyAnbm9ybWFsJyArICcmZGF0YT0nICsgZm9ybURhdGEgO1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PGFueT4oQ29uZmlnLmFwaVVybCxkYXRhLGh0dHBPcHRpb25zKTsgLy8uc2hhcmVSZXBsYXkoKTsgXG4gICAgfVxuXG4gICAgYWRkUHJvdG9jb2woKTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgdmFyIGRhdGEgPSAndG9rZW49JyArIENvbmZpZy50b2tlbiArICcmZm9ybWF0PScgKyAnanNvbicgKyAnJmNvbnRlbnQ9JyArICdtZXRhZGF0YScgKyAnJnJldHVybkZvcm1hdD0nICsgJ2pzb24nO1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFN0dWR5bWV0YWRhdGFbXT4oQ29uZmlnLmFwaVVybCxkYXRhLGh0dHBPcHRpb25zKTsgXG4gICAgfVxuXG4gICBjcmVhdGVSZXNwb25zZU9wdGlvbnMoc2VsZWN0X2Nob2ljZXNfb3JfY2FsY3VsYXRpb25zOiBzdHJpbmcpOiBSZXNwb25zZW9wdGlvbltdIHtcbiAgICAgIFxuICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBBcnJheTxSZXNwb25zZW9wdGlvbj4oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB4b3B0aW9ucyA9IHNlbGVjdF9jaG9pY2VzX29yX2NhbGN1bGF0aW9ucy5zcGxpdChcInxcIik7XG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB4b3B0aW9ucy5sZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgICAgICB2YXIgeCA9IHhvcHRpb25zW2luZGV4XS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlb3B0aW9uKCk7XG4gICAgICAgICAgcmVzcG9uc2UudmFsdWUgPSB4WzBdO1xuICAgICAgICAgIHJlc3BvbnNlLmxhYmVsID0geFsxXTtcbiAgICAgICAgICBvcHRpb25zLnB1c2gocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGNyZWF0ZUxhYmVsT3B0aW9ucyhzZWxlY3RfY2hvaWNlc19vcl9jYWxjdWxhdGlvbnM6IHN0cmluZyk6IGFueVtdIHtcbiAgICAgIFxuICAgICAgICB2YXIgb3B0aW9ucyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgdmFyIHhvcHRpb25zID0gc2VsZWN0X2Nob2ljZXNfb3JfY2FsY3VsYXRpb25zLnNwbGl0KFwifFwiKTtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHhvcHRpb25zLmxlbmd0aDsgKytpbmRleCkge1xuICAgICAgICAgIHZhciB4ID0geG9wdGlvbnNbaW5kZXhdLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICBvcHRpb25zLnB1c2goeFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgY3JlYXRlWWVzTm8oKTogU2VnbWVudGVkQmFySXRlbVtdIHtcbiAgICAgICAgdmFyIG15SXRlbXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgaXRlbS50aXRsZSA9IFwiVGFiIFwiICsgaTtcbiAgICAgICAgICAgIG15SXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXlJdGVtcztcblxuICAgIH1cblxuICAgIGdldEl0ZW1zKCk6ICBPYnNlcnZhYmxlPFN0dWR5Zm9ybVtdPiB7XG5cbiAgICAgICAgdmFyIGZvcm1zID0gbmV3IEFycmF5PFN0dWR5Zm9ybT4oKVxuXG4gICAgICAgIHJldHVybiB0aGlzLmFkZFByb3RvY29sKCkubWFwKFxuICAgICAgICBmaWVsZHMgPT4ge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZCBvZiBmaWVsZHMpe1xuXG4gICAgICAgICAgICAgIGlmKGZpZWxkLmZvcm1fbmFtZSA9PSAncmVnaXN0cmF0aW9uJyl7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihmb3Jtc1tpXS5mb3JtX25hbWUgPT0gZmllbGQuZm9ybV9uYW1lKXtcbiAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnNlbGVjdF9jaG9pY2VzID0gdGhpcy5jcmVhdGVSZXNwb25zZU9wdGlvbnMoZmllbGQuc2VsZWN0X2Nob2ljZXNfb3JfY2FsY3VsYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnNlbGVjdF9sYWJlbHMgPSB0aGlzLmNyZWF0ZUxhYmVsT3B0aW9ucyhmaWVsZC5zZWxlY3RfY2hvaWNlc19vcl9jYWxjdWxhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgLy9maWVsZC55ZXNubyA9IHRoaXMuY3JlYXRlWWVzTm8oKTtcbiAgICAgICAgICAgICAgICAgIGZvcm1zW2ldLmZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCIuLnB1c2hpbmcgXCIgKyBmaWVsZC5maWVsZF9uYW1lKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmKCFmb3VuZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNmID0gbmV3IFN0dWR5Zm9ybSgpO1xuICAgICAgICAgICAgICAgIHNmLmZvcm1fbmFtZSA9IGZpZWxkLmZvcm1fbmFtZTtcbiAgICAgICAgICAgICAgICBzZi5maWVsZHMgPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICAgICAgICAgIGZpZWxkLnNlbGVjdF9jaG9pY2VzID0gdGhpcy5jcmVhdGVSZXNwb25zZU9wdGlvbnMoZmllbGQuc2VsZWN0X2Nob2ljZXNfb3JfY2FsY3VsYXRpb25zKTtcbiAgICAgICAgICAgICAgICBmaWVsZC5zZWxlY3RfbGFiZWxzID0gdGhpcy5jcmVhdGVMYWJlbE9wdGlvbnMoZmllbGQuc2VsZWN0X2Nob2ljZXNfb3JfY2FsY3VsYXRpb25zKTtcbiAgICAgICAgICAgICAgICAvL2ZpZWxkLnllc25vID0gdGhpcy5jcmVhdGVZZXNObygpO1xuICAgICAgICAgICAgICAgIHNmLmZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi4uYWRkaW5nIFwiICsgZmllbGQuZmllbGRfbmFtZSk7IFxuICAgICAgICAgICAgICAgIGZvcm1zLnB1c2goc2YpO1xuICAgICAgICAgICAgICB9ICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm9ybXM7IFxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgZ2V0SXRlbShpZDogc3RyaW5nKTogU3R1ZHlmb3JtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybXMuZmlsdGVyKGZvcm0gPT4gZm9ybS5mb3JtX25hbWUgPT09IGlkKVswXTtcbiAgICB9XG4gICAgKi9cblxuICAgIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgICAgLy9yZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gIH1cbn1cbiJdfQ==