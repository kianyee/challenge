"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoute = exports.getNextPendingRoute = exports.updateRouteStatus = exports.getFastestReturningRoute = exports.printRoute = void 0;
var service_1 = require("../deliveryTime/service");
var route = [];
var deliveryCostAndTimeList;
function generateRouteId(index) {
    var id = index + 1;
    return 'Route' + id;
}
function calculateTripTime(packageList) {
    var deliveryTimes = [];
    packageList.forEach(function (pkg) {
        var detail = (0, service_1.getDeliveryDetailById)(deliveryCostAndTimeList, pkg);
        if (detail) {
            deliveryTimes.push(detail.time);
        }
    });
    return Math.max.apply(Math, deliveryTimes);
}
function packageGrouping(deliveryDetails, maxLoad) {
    if (!(deliveryDetails === null || deliveryDetails === void 0 ? void 0 : deliveryDetails.length))
        return [];
    var addedToRoute = new Set();
    for (var currentIndex = 0; currentIndex < deliveryDetails.length; currentIndex++) {
        var packageList = [];
        var currentLoad = deliveryDetails[currentIndex].weight;
        if (addedToRoute.has(deliveryDetails[currentIndex].id))
            continue;
        packageList.push(deliveryDetails[currentIndex].id);
        addedToRoute.add(deliveryDetails[currentIndex].id);
        for (var searchIndex = 0; searchIndex < deliveryDetails.length; searchIndex++) {
            if (currentIndex !== searchIndex
                && !addedToRoute.has(deliveryDetails[searchIndex].id)
                && (currentLoad + deliveryDetails[searchIndex].weight <= maxLoad)) {
                packageList.push(deliveryDetails[searchIndex].id);
                addedToRoute.add(deliveryDetails[searchIndex].id);
                currentLoad = currentLoad + deliveryDetails[searchIndex].weight;
            }
        }
        route.push({
            id: '',
            pkgId: packageList,
            totalWeight: currentLoad,
            pkgDeliverTime: calculateTripTime(packageList),
            status: 'Pending'
        });
    }
}
function sortByTotalWeightDesc(route) {
    return route.sort(function (a, b) {
        return a.totalWeight > b.totalWeight ? -1 : 1;
    });
}
function sortByWeightDesc(deliveryDetails) {
    return deliveryDetails.sort(function (a, b) {
        return a.weight > b.weight ? -1 : 1;
    });
}
function updatePkgOrderandId() {
    for (var index = 0; index < route.length; index++) {
        route[index].order = index + 1;
        route[index].id = generateRouteId(index);
    }
}
function printRoute(value) {
    console.log('----------------------------------------------------------');
    value.forEach(function (r) {
        console.log(r.id + '\t' + r.pkgId + '\t' + r.totalWeight + '\t' + r.pkgDeliverTime + '\t' + r.status);
    });
    console.log('----------------------------------------------------------');
}
exports.printRoute = printRoute;
function getFastestReturningRoute(route) {
    var fastestRoute;
    var fastestTime = Number.MAX_VALUE;
    route.forEach(function (r) {
        if ((r === null || r === void 0 ? void 0 : r.status) === 'Delivering' && r.pkgDeliverTime < fastestTime) {
            fastestTime = r.pkgDeliverTime;
            fastestRoute = r;
        }
    });
    if (fastestTime != Number.MAX_VALUE) {
        return fastestRoute;
    }
    return;
}
exports.getFastestReturningRoute = getFastestReturningRoute;
function updateRouteStatus(route, id, status, currentTime) {
    route.forEach(function (r) {
        if (r.id === id) {
            r.status = status;
            if (currentTime !== undefined) {
                r.pkgDeliverBy = r.pkgDeliverTime + currentTime;
            }
        }
    });
    return route;
}
exports.updateRouteStatus = updateRouteStatus;
function getNextPendingRoute(route) {
    return route.find(function (r) {
        return r.status === 'Pending';
    });
}
exports.getNextPendingRoute = getNextPendingRoute;
function generateRoute(deliveryDetails, maxLoad, baseDeliveryCose, speed) {
    deliveryCostAndTimeList = (0, service_1.generateDeliveryCostAndTime)(deliveryDetails, baseDeliveryCose, speed);
    sortByWeightDesc(deliveryDetails);
    packageGrouping(deliveryDetails, maxLoad);
    sortByTotalWeightDesc(route);
    updatePkgOrderandId();
    console.log('------------------Generating Route------------------------');
    printRoute(route);
    return route;
}
exports.generateRoute = generateRoute;
