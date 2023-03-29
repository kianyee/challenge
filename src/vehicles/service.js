"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeliveryAsDone = exports.assignVehicles = exports.generateVehicles = void 0;
var service_1 = require("../route/service");
var vehicles = [];
function getNextFreeVechicle() {
    var vehicle = vehicles.find(function (vehicle) {
        return !(vehicle === null || vehicle === void 0 ? void 0 : vehicle.routeId);
    });
    return vehicle;
}
function updateVehicleInfo(routeId, vehicleId, tripTime) {
    vehicles.forEach(function (vehicle) {
        if (vehicle.id === vehicleId) {
            vehicle.routeId = routeId;
            vehicle.returnTime = tripTime * 2;
        }
    });
}
function unassignRoute(id) {
    vehicles.forEach(function (vehicle) {
        if (vehicle.id === id) {
            vehicle.routeId = undefined;
        }
    });
}
function getVehicleByRouteId(id) {
    return vehicles.find(function (vehicle) {
        return vehicle.routeId === id;
    });
}
function printVehicle() {
    console.log('----------------------------------------------------------');
    vehicles.forEach(function (vehicle) {
        console.log(vehicle.id + '\t' + vehicle.routeId + '\t' + vehicle.returnTime);
    });
    console.log('----------------------------------------------------------');
}
function generateVehicles(value) {
    for (var index = 1; index <= value; index++) {
        vehicles.push({
            id: 'Vehicle' + index
        });
    }
    console.log('------------------Generating Vechicle---------------------');
    printVehicle();
    return vehicles;
}
exports.generateVehicles = generateVehicles;
function assignVehicles(route) {
    var nextRoute = (0, service_1.getNextPendingRoute)(route);
    var nextVechicle = getNextFreeVechicle();
    if (nextRoute && nextVechicle) {
        var updatedRoute = (0, service_1.updateRouteStatus)(route, nextRoute.id, 'Delivering', (nextVechicle === null || nextVechicle === void 0 ? void 0 : nextVechicle.returnTime) || 0);
        updateVehicleInfo(nextRoute.id, nextVechicle.id, nextRoute.pkgDeliverTime);
        console.log('------------------Assign Vechicle-------------------------');
        printVehicle();
        console.log('------------------Update Route----------------------------');
        (0, service_1.printRoute)(route);
        return updatedRoute;
    }
    console.log('No vehicle or package available!!');
    return route;
}
exports.assignVehicles = assignVehicles;
function updateDeliveryAsDone(route) {
    var fastestReturningRoute = (0, service_1.getFastestReturningRoute)(route);
    if (fastestReturningRoute) {
        (0, service_1.updateRouteStatus)(route, fastestReturningRoute.id, 'Delivered');
        var vehicle = getVehicleByRouteId(fastestReturningRoute.id);
        if (vehicle) {
            unassignRoute(vehicle === null || vehicle === void 0 ? void 0 : vehicle.id);
        }
        console.log('------------------Vechicle Returned-----------------------');
        printVehicle();
        console.log('------------------Update Route as Delivered---------------');
        (0, service_1.printRoute)(route);
        return route;
    }
    console.log('No vehicle is delivering!!');
    return route;
}
exports.updateDeliveryAsDone = updateDeliveryAsDone;
