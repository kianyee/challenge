"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferCodeMap = void 0;
var offerTenPercent = {
    discount: 10,
    distanceStart: 0,
    distanceEnd: 200,
    weightStart: 70,
    weightEnd: 200
};
var offerSeventPercent = {
    discount: 7,
    distanceStart: 50,
    distanceEnd: 150,
    weightStart: 100,
    weightEnd: 250
};
var offerFivePercent = {
    discount: 5,
    distanceStart: 50,
    distanceEnd: 250,
    weightStart: 10,
    weightEnd: 150
};
exports.OfferCodeMap = new Map([
    ["OFR001", offerTenPercent],
    ["OFR002", offerSeventPercent],
    ["OFR003", offerFivePercent]
]);
