import { Route, Vehicle } from "../interface";
import { getFastestReturningRoute, getNextPendingRoute, printRoute, updateRouteStatus } from "../route/service";

const vehicles: Vehicle[] = []

function getNextFreeVechicle() {
    const vehicle = vehicles.find((vehicle) => {
        return !vehicle?.routeId
    })
    return vehicle
}

function updateVehicleInfo(routeId: string, vehicleId: string, tripTime: number) {
    vehicles.forEach((vehicle) => {
        if (vehicle.id === vehicleId) {
            vehicle.routeId = routeId
            vehicle.returnTime = tripTime * 2
        }
    })
}

function unassignRoute(id: string) {
    vehicles.forEach((vehicle) => {
        if (vehicle.id === id) {
            vehicle.routeId = undefined
        }
    })
}

function getVehicleByRouteId(id: string) {
    return vehicles.find((vehicle) => {
        return vehicle.routeId === id
    })
}

function printVehicle() {
    console.log('----------------------------------------------------------')
    vehicles.forEach((vehicle) => {
        console.log(vehicle.id + '\t' + vehicle.routeId + '\t' + vehicle.returnTime)
    })
    console.log('----------------------------------------------------------')
}

export function generateVehicles(value: number): Vehicle[] {
    for (let index = 1; index <= value; index++) {
        vehicles.push({
            id: 'Vehicle' + index
        })
    }
    console.log('------------------Generating Vechicle---------------------')
    printVehicle()
    return vehicles
}

export function assignVehicles(route: Route[]): Route[] {
    const nextRoute = getNextPendingRoute(route)
    const nextVechicle = getNextFreeVechicle()
    if (nextRoute && nextVechicle) {
        const updatedRoute = updateRouteStatus(route, nextRoute.id, 'Delivering', nextVechicle?.returnTime || 0)
        updateVehicleInfo(nextRoute.id, nextVechicle.id, nextRoute.pkgDeliverTime)
        console.log('------------------Assign Vechicle-------------------------')
        printVehicle()
        console.log('------------------Update Route----------------------------')
        printRoute(route)
        return updatedRoute
    }
    console.log('No vehicle or package available!!')
    return route
}

export function updateDeliveryAsDone(route: Route[]) {
    const fastestReturningRoute = getFastestReturningRoute(route)
    if (fastestReturningRoute) {
        updateRouteStatus(route, fastestReturningRoute.id, 'Delivered')
        const vehicle = getVehicleByRouteId(fastestReturningRoute.id)
        if (vehicle) {
            unassignRoute(vehicle?.id)
        }
        console.log('------------------Vechicle Returned-----------------------')
        printVehicle()
        console.log('------------------Update Route as Delivered---------------')
        printRoute(route)
        return route
    }
    console.log('No vehicle is delivering!!')
    return route
}
