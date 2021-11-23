"use strict";
exports.__esModule = true;
exports.TravelPackageOriginator = void 0;
var TravelPackage_entity_1 = require("../../TravelPackage/entities/TravelPackage.entity");
var TravelPackageOriginator = /** @class */ (function () {
    function TravelPackageOriginator() {
    }
    TravelPackageOriginator.prototype.getAmount = function () { return this.amount; };
    TravelPackageOriginator.prototype.getDescription = function () { return this.description; };
    TravelPackageOriginator.prototype.getUrl = function () { return this.url; };
    TravelPackageOriginator.prototype.getId = function () { return this.id; };
    TravelPackageOriginator.prototype.getPromotion = function () { return this.promotion; };
    TravelPackageOriginator.prototype.setAmount = function (amount) { this.amount = amount; };
    TravelPackageOriginator.prototype.setDescription = function (description) { this.description = description; };
    TravelPackageOriginator.prototype.setUrl = function (url) { this.url = url; };
    TravelPackageOriginator.prototype.setId = function (id) { this.id = id; };
    TravelPackageOriginator.prototype.setPromotion = function (promotion) { this.promotion = promotion; };
    TravelPackageOriginator.prototype.toString = function () {
        return "Travel Package with: " + this.id + ":" + this.description + ":" + this.url + ":" + this.amount;
    };
    TravelPackageOriginator.prototype.setMemento = function (travel_package) {
        this.id = travel_package.getId();
        this.description = travel_package.getDescription();
        this.amount = travel_package.getAmount();
        this.url = travel_package.getUrl();
        this.promotion = travel_package.getPromotion();
    };
    TravelPackageOriginator.prototype.createMemento = function () {
        return new TravelPackage_entity_1.TravelPackageEntity(this.id, this.amount, this.description, this.promotion, this.url);
    };
    return TravelPackageOriginator;
}());
exports.TravelPackageOriginator = TravelPackageOriginator;
