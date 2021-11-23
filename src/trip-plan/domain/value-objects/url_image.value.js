"use strict";
exports.__esModule = true;
exports.UrlImage = void 0;
var app_notification_1 = require("../../../../common/application/app.notification");
var typescript_result_1 = require("typescript-result");
var UrlImage = /** @class */ (function () {
    function UrlImage(url) {
        this.url = url;
    }
    UrlImage.prototype.getValue = function () {
        return this.url;
    };
    UrlImage.prototype.setValue = function (value) { this.url = value; };
    UrlImage.create = function (value) {
        var notification = new app_notification_1.AppNotification();
        value = (value !== null && value !== void 0 ? value : "").trim();
        if (value === "") {
            notification.addError('companyName is required', null);
        }
        if (notification.hasErrors()) {
            return typescript_result_1.Result.error(notification);
        }
        return typescript_result_1.Result.ok(new UrlImage(value));
    };
    return UrlImage;
}());
exports.UrlImage = UrlImage;
