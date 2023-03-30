import { getDiscount } from "../src/offers/service";

describe('offer service', () => {
    test('should calculate time correctly', () => {
        expect(getDiscount(50, 30, '')).toBe(0)
        expect(getDiscount(50, 30, 'OFR001')).toBe(0)
        expect(getDiscount(50, 210, 'OFR001')).toBe(0)
        expect(getDiscount(50, 80, 'OFR001')).toBe(10)
        expect(getDiscount(50, 80, 'OFR00999')).toBe(0)

        expect(getDiscount(40, 80, 'OFR002')).toBe(0)
        expect(getDiscount(40, 280, 'OFR002')).toBe(0)
        expect(getDiscount(50, 110, 'OFR002')).toBe(7)

        expect(getDiscount(40, 80, 'OFR003')).toBe(0)
        expect(getDiscount(40, 280, 'OFR003')).toBe(0)
        expect(getDiscount(50, 110, 'OFR003')).toBe(5)
    })
})