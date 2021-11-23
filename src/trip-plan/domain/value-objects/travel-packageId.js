"use strict";
exports.__esModule = true;
exports.TravelPackageId = void 0;
var TravelPackageId = /** @class */ (function () {
    function TravelPackageId(value) {
        this.value = value;
    }
    TravelPackageId.prototype.getValue = function () {
        return this.value;
    };
    TravelPackageId.prototype.setValue = function (value) { this.value = value; };
    TravelPackageId.prototype.create = function (value) {
        return new TravelPackageId(value);
    };
    return TravelPackageId;
}());
exports.TravelPackageId = TravelPackageId;
