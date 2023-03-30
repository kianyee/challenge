import { calculateTimePerTrip, generateDeliveryCostAndTime, getDeliveryDetailById } from "../src/deliveryTime/service";
import { baseDeliveryCose, inputChallenge2, maxSpeed } from "../src/input";
import { DeliveryCostAndTime } from "../src/interface";

const deliveryCostAndTimeList: DeliveryCostAndTime[] = []
const testId = 'PKG1'
const discount = 3
deliveryCostAndTimeList.push(
    {
        id: testId,
        discount: 3,
        totalCost: 50,
        time: 1.2
    }
)

describe('delivery time service', () => {
    test('should calculate time correctly', () => {
        expect(calculateTimePerTrip(70, 125)).toBe("1.78")
    })

    test('should calculate time correctly', () => {
        expect(getDeliveryDetailById(deliveryCostAndTimeList, testId)?.discount).toBe(discount)
        expect(getDeliveryDetailById(deliveryCostAndTimeList, 'PKG999')?.discount).toBeFalsy()
    })

    test('should generate delivery const and time correctly', () => {
        const deliveryCostAndTimeList = generateDeliveryCostAndTime(inputChallenge2, baseDeliveryCose, maxSpeed)
        expect(deliveryCostAndTimeList?.length).toBe(inputChallenge2?.length)
        expect(deliveryCostAndTimeList[0]?.time).toBe(calculateTimePerTrip(maxSpeed, 30))
    })
})