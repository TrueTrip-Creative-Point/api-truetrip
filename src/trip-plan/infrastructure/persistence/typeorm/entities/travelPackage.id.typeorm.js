"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TravelPackageIdTypeORM = void 0;
var typeorm_1 = require("typeorm");
var TravelPackageIdTypeORM = /** @class */ (function () {
    function TravelPackageIdTypeORM(value) {
        this.value = value;
    }
    TravelPackageIdTypeORM.from = function (value) {
        return new TravelPackageIdTypeORM(value);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('increment', { type: 'bigint', name: 'id', unsigned: true })
    ], TravelPackageIdTypeORM.prototype, "value");
    return TravelPackageIdTypeORM;
}());
exports.TravelPackageIdTypeORM = TravelPackageIdTypeORM;
