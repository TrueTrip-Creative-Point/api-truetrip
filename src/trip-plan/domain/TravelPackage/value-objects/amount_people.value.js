"use strict";
exports.__esModule = true;
exports.Amount_people = void 0;
var app_notification_1 = require("../../../../common/application/app.notification");
var typescript_result_1 = require("typescript-result");
var Amount_people = /** @class */ (function () {
    function Amount_people(amount_people) {
        this.amount_people = amount_people;
    }
    Amount_people.prototype.getValue = function () {
        return this.amount_people;
    };
    Amount_people.prototype.setValue = function (value) { this.amount_people = value; };
    Amount_people.create = function (value) {
        var notification = new app_notification_1.AppNotification();
        value = (value !== null && value !== void 0 ? value : "").trim();
        if (value === "") {
            notification.addError('companyName is required', null);
        }
        if (notification.hasErrors()) {
            return typescript_result_1.Result.error(notification);
        }
        return typescript_result_1.Result.ok(new Amount_people(Number(value)));
    };
    return Amount_people;
}());
exports.Amount_people = Amount_people;
