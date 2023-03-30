import { getDiscount } from "../src/offers/service";
import { generateVehicles } from "../src/vehicles/service";

describe('vehicle service', () => {
    test('should initialize vehicle correctly', () => {
        const vehicles = generateVehicles(2)
        expect(vehicles.length).toBe(2)
        expect(vehicles[0].returnTime).toBeFalsy()
        expect(vehicles[0].routeId).toBeFalsy()
    })
})