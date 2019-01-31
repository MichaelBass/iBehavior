"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_ui_calendar_1 = require("nativescript-ui-calendar");
var color_1 = require("color");
var CalendarService = /** @class */ (function () {
    function CalendarService() {
    }
    CalendarService.prototype.getCalendarEvents = function () {
        var now = new Date();
        var startDate, endDate, event;
        var colors = [new color_1.Color(200, 188, 26, 214), new color_1.Color(220, 255, 109, 130), new color_1.Color(255, 55, 45, 255), new color_1.Color(199, 17, 227, 10), new color_1.Color(255, 255, 54, 3)];
        var events = new Array();
        for (var i = 1; i < 10; i++) {
            startDate = new Date(now.getFullYear(), now.getMonth(), i * 2, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), (i * 2), 3);
            event = new nativescript_ui_calendar_1.CalendarEvent("event " + i, startDate, endDate, false, colors[i * 10 % (colors.length - 1)]);
            events.push(event);
            if (i % 3 === 0) {
                event = new nativescript_ui_calendar_1.CalendarEvent("second " + i, startDate, endDate, true, colors[i * 5 % (colors.length - 1)]);
                events.push(event);
            }
        }
        return events;
    };
    CalendarService = __decorate([
        core_1.Injectable()
    ], CalendarService);
    return CalendarService;
}());
exports.CalendarService = CalendarService;
