"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscount = void 0;
var offerCode_1 = require("./offerCode");
function isDistanceValid(offerDetail, distance) {
    return distance >= offerDetail.distanceStart && distance <= offerDetail.distanceEnd;
}
function isWeightValid(offerDetail, weight) {
    return weight >= offerDetail.weightStart && weight <= offerDetail.weightEnd;
}
function isDistanceAndWeightValid(offerDetail, distance, weight) {
    return isDistanceValid(offerDetail, distance) && isWeightValid(offerDetail, weight);
}
function getDiscount(distance, weight, offerCode) {
    var offerDetail = offerCode_1.OfferCodeMap.get(offerCode);
    if (offerDetail) {
        return isDistanceAndWeightValid(offerDetail, distance, weight) ? offerDetail.discount : 0;
    }
    return 0;
}
exports.getDiscount = getDiscount;
