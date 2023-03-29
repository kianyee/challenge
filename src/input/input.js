"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInputMap = void 0;
function generateInputMap(deliveryDetails) {
    var inputMap = new Map();
    deliveryDetails.forEach(function (detail) {
        inputMap.set(detail.id, detail);
    });
    return inputMap;
}
exports.generateInputMap = generateInputMap;
