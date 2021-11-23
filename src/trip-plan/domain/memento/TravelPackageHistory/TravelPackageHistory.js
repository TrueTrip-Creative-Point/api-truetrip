"use strict";
exports.__esModule = true;
exports.TravelPackageHistory = void 0;
var TravelPackageHistory = /** @class */ (function () {
    function TravelPackageHistory() {
        this.travel_packageHistory = [];
    }
    TravelPackageHistory.prototype.save = function (travel_packageOriginator) {
        this.travel_packageHistory.push(travel_packageOriginator.createMemento());
    };
    TravelPackageHistory.prototype.revert = function (travel_packageOriginator) {
        if (this.travel_packageHistory.length > 0) {
            travel_packageOriginator.setMemento(this.travel_packageHistory.pop());
        }
    };
    return TravelPackageHistory;
}());
exports.TravelPackageHistory = TravelPackageHistory;
