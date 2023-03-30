import { calculateTimePerTrip, getDeliveryDetailById } from "../src/deliveryTime/service";
import { DeliveryCostAndTime } from "../src/interface";

const deliveryCostAndTimeList: DeliveryCostAndTime[] = []
deliveryCostAndTimeList.push(
    {
        id: 'PKG1',
        discount: 3,
        totalCost: 50,
        time: 1.2
    }
)

describe('delivery time service', () => {
    test('should calculate time correctly', () => {
        expect(calculateTimePerTrip(70, 125)).toBe("1.78")
        // expect(calculateTimePerTrip(125, 125)).toBe("1.00")
    })

    test('should calculate time correctly', () => {
        expect(getDeliveryDetailById(deliveryCostAndTimeList, 'PKG1')?.discount).toBe(3)
        expect(getDeliveryDetailById(deliveryCostAndTimeList, 'PKG999')?.discount).toBeFalsy()
    })
})