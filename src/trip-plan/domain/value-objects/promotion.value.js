"use strict";
exports.__esModule = true;
exports.Promotion = void 0;
var app_notification_1 = require("../../../../common/application/app.notification");
var typescript_result_1 = require("typescript-result");
var Promotion = /** @class */ (function () {
    function Promotion(value) {
        this.value = value;
    }
    Promotion.prototype.getValue = function () {
        return this.value;
    };
    Promotion.prototype.setValue = function (value) { this.value = value; };
    Promotion.create = function (value) {
        var notification = new app_notification_1.AppNotification();
        value = (value !== null && value !== void 0 ? value : "").trim();
        if (value.length >= this.MAX_LENGTH) {
            notification.addError('promotion must have ' + Promotion.MAX_LENGTH + 'characters', null);
        }
        if (notification.hasErrors()) {
            return typescript_result_1.Result.error(notification);
        }
        return typescript_result_1.Result.ok(new Promotion(value));
    };
    Promotion.MAX_LENGTH = 300;
    return Promotion;
}());
exports.Promotion = Promotion;
