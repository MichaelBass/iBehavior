"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var calendar_service_1 = require("./calendar.service");
var ScheduleComponent = /** @class */ (function () {
    function ScheduleComponent(_calendarService) {
        this._calendarService = _calendarService;
    }
    Object.defineProperty(ScheduleComponent.prototype, "eventSource", {
        get: function () {
            return this._events;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScheduleComponent.prototype, "myItems", {
        get: function () {
            return this._listItems;
        },
        set: function (value) {
            this._listItems = value;
        },
        enumerable: true,
        configurable: true
    });
    ScheduleComponent.prototype.ngOnInit = function () {
        this._events = this._calendarService.getCalendarEvents();
    };
    ScheduleComponent.prototype.onDateSelected = function (args) {
        var calendar = args.object;
        var date = args.date;
        var events = calendar.getEventsForDate(date);
        this.myItems = events;
    };
    ScheduleComponent = __decorate([
        core_1.Component({
            selector: "ns-schedule",
            moduleId: module.id,
            templateUrl: "./schedule.component.html",
            styleUrls: ["./schedule.css"]
        }),
        __metadata("design:paramtypes", [calendar_service_1.CalendarService])
    ], ScheduleComponent);
    return ScheduleComponent;
}());
exports.ScheduleComponent = ScheduleComponent;
