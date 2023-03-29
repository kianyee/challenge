import { calculateTimePerTrip } from "../src/deliveryTime/service";

describe('delivery time service', () => {
    test('should calculate time correctly', () => {
        expect(calculateTimePerTrip(70, 125)).toBe("1.78");
    });
});