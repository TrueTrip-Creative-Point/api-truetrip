"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TravelPackageEntity = void 0;
var cqrs_1 = require("@nestjs/cqrs");
var travel_package_event_1 = require("../events/travel-package.event");
var TravelPackageEntity = /** @class */ (function (_super) {
    __extends(TravelPackageEntity, _super);
    function TravelPackageEntity(id, amount, description, promotion, url) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.amount = amount;
        _this.description = description;
        _this.promotion = promotion;
        _this.url = url;
        return _this;
    }
    TravelPackageEntity.prototype.register = function () {
        var event = new travel_package_event_1.TravelPackageEvent(this.id, this.amount, this.description, this.promotion, this.url);
    };
    TravelPackageEntity.prototype.getId = function () { return this.id; };
    TravelPackageEntity.prototype.getAmount = function () { return this.amount; };
    TravelPackageEntity.prototype.getDescription = function () { return this.description; };
    TravelPackageEntity.prototype.getPromotion = function () { return this.promotion; };
    TravelPackageEntity.prototype.getUrl = function () { return this.url; };
    return TravelPackageEntity;
}(cqrs_1.AggregateRoot));
exports.TravelPackageEntity = TravelPackageEntity;
