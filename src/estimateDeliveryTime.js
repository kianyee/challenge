"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
var service_1 = require("./route/service");
var service_2 = require("./vehicles/service");
var route = (0, service_1.generateRoute)(input_1.inputChallenge2, input_1.maxLoad, input_1.baseDeliveryCose, input_1.maxSpeed);
(0, service_2.generateVehicles)(input_1.vehicleNumber);
route = (0, service_2.assignVehicles)(route);
route = (0, service_2.assignVehicles)(route);
// test if no more vehicle
route = (0, service_2.assignVehicles)(route);
route = (0, service_2.updateDeliveryAsDone)(route);
route = (0, service_2.updateDeliveryAsDone)(route);
route = (0, service_2.assignVehicles)(route);
route = (0, service_2.assignVehicles)(route);
route = (0, service_2.updateDeliveryAsDone)(route);
route = (0, service_2.updateDeliveryAsDone)(route);
