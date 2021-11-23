"use strict";
exports.__esModule = true;
exports.Description = void 0;
var app_notification_1 = require("../../../../common/application/app.notification");
var typescript_result_1 = require("typescript-result");
var Description = /** @class */ (function () {
    function Description(value) {
        this.value = value;
    }
    Description.prototype.getValue = function () {
        return this.value;
    };
    Description.prototype.setValue = function (value) { this.value = value; };
    Description.create = function (value) {
        var notification = new app_notification_1.AppNotification();
        value = (value !== null && value !== void 0 ? value : "").trim();
        if (value === "") {
            notification.addError('companyName is required', null);
        }
        if (notification.hasErrors()) {
            return typescript_result_1.Result.error(notification);
        }
        return typescript_result_1.Result.ok(new Description(value));
    };
    return Description;
}());
exports.Description = Description;
