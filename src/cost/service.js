"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliverySummary = exports.generateDeliverySummary = void 0;
var service_1 = require("../offers/service");
var constants_1 = require("./constants");
function calcluateCost(baseDeliveryCose, weight, distance) {
    return baseDeliveryCose + weight * constants_1.WEIGHT_MULTIPLIER + distance * constants_1.DISTANCE_MUTIPLIER;
}
function calculateDiscount(cost, discount) {
    return cost * discount / 100;
}
function generateDeliveryCost(baseDeliveryCose, id, weight, offerCode, distance) {
    var discountFromOfrCode = offerCode ? (0, service_1.getDiscount)(distance, weight, offerCode) : 0;
    var cost = calcluateCost(baseDeliveryCose, weight, distance);
    var totalDiscount = calculateDiscount(cost, discountFromOfrCode);
    return {
        id: id,
        discount: totalDiscount,
        totalCost: cost - totalDiscount
    };
}
function generateDeliverySummary(deliveryDetails, baseDeliveryCose) {
    var deliveryCostSummary = [];
    deliveryDetails.forEach(function (detail) {
        if (detail.distance > 0 && detail.weight > 0) {
            deliveryCostSummary.push(generateDeliveryCost(baseDeliveryCose, detail.id, detail.weight, detail === null || detail === void 0 ? void 0 : detail.offerCode, detail.distance));
        }
    });
    return deliveryCostSummary;
}
exports.generateDeliverySummary = generateDeliverySummary;
function printDeliverySummary(deliveryDetails, baseDeliveryCose) {
    var deliveryCostSummary = generateDeliverySummary(deliveryDetails, baseDeliveryCose);
    deliveryCostSummary.forEach(function (summary) {
        console.log(summary.id + " " + summary.discount + " " + summary.totalCost);
    });
}
exports.printDeliverySummary = printDeliverySummary;
