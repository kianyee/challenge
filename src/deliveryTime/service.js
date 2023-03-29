"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printDeliveryCostAndTime = exports.generateDeliveryCostAndTime = exports.calculateTimePerTrip = exports.getDeliveryDetailById = void 0;
var service_1 = require("../cost/service");
var input_1 = require("../input/input");
function covertTo2DecimalPlace(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}
function getDeliveryDetailById(deliveryDetails, id) {
    return deliveryDetails.find(function (detail) {
        return detail.id == id;
    });
}
exports.getDeliveryDetailById = getDeliveryDetailById;
function calculateTimePerTrip(speed, distance) {
    return covertTo2DecimalPlace((distance / speed), 2);
}
exports.calculateTimePerTrip = calculateTimePerTrip;
function generateDeliveryCostAndTime(deliveryDetails, baseDeliveryCose, speed) {
    var inputMap = (0, input_1.generateInputMap)(deliveryDetails);
    var deliveryCostAndTimeList = (0, service_1.generateDeliverySummary)(deliveryDetails, baseDeliveryCose);
    deliveryCostAndTimeList.forEach(function (delivery) {
        var deliveryDetail = inputMap.get(delivery.id);
        if (deliveryDetail) {
            delivery.time = calculateTimePerTrip(speed, deliveryDetail.distance);
        }
    });
    return deliveryCostAndTimeList;
}
exports.generateDeliveryCostAndTime = generateDeliveryCostAndTime;
function printDeliveryCostAndTime(deliveryDetails, baseDeliveryCose, speed) {
    var deliveryCostSummary = generateDeliveryCostAndTime(deliveryDetails, baseDeliveryCose, speed);
    deliveryCostSummary.forEach(function (summary) {
        console.log(summary.id + " " + summary.discount + " " + summary.totalCost + " " + summary.time);
    });
}
exports.printDeliveryCostAndTime = printDeliveryCostAndTime;
