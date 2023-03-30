import { baseDeliveryCose, inputChallenge2, maxLoad, maxSpeed } from "../src/input";
import { generateRoute, getFastestReturningRoute, getNextPendingRoute, updateRouteStatus } from "../src/route/service";
import { generateVehicles } from "../src/vehicles/service";

describe('vehicle service', () => {
    let route = generateRoute(inputChallenge2, maxLoad, baseDeliveryCose, maxSpeed)
    test('should initialize route correctly', () => {
        expect(route?.length).toBe(4)
    })

    test('should initialize route correctly', () => {
        const firstPendingRoute = getNextPendingRoute(route)
        expect(firstPendingRoute?.id).toBe('Route1')
    })


    test('should update route correctly', () => {
        route = updateRouteStatus(route, 'Route1', 'Delivering', 1)
        const nextPendingRoute = getNextPendingRoute(route)
        expect(nextPendingRoute?.id).toBe('Route2')
        const fastestRoute = getFastestReturningRoute(route)
        expect(fastestRoute?.id).toBe('Route1')
    })
})