import { generateDeliverySummary } from "../cost/service"
import { generateInputMap } from "../input/input"
import { DeliveryCostAndTime, DeliveryDetail } from "../interface"


function covertTo2DecimalPlace(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

export function getDeliveryDetailById(deliveryDetails: DeliveryCostAndTime[], id: string) {
    return deliveryDetails.find((detail) => {
        return detail.id == id
    })
}

export function calculateTimePerTrip(speed: number, distance: number): number {
    try {
        if (speed === 0) {
            throw new Error('Speed cannot be zero')
        }
        return covertTo2DecimalPlace((distance / speed), 2)
    } catch (e) {
        throw e
    }
}

export function generateDeliveryCostAndTime(deliveryDetails: DeliveryDetail[], baseDeliveryCose: number, speed: number) {
    const inputMap = generateInputMap(deliveryDetails)
    const deliveryCostAndTimeList = generateDeliverySummary(deliveryDetails, baseDeliveryCose) as unknown as DeliveryCostAndTime[]
    deliveryCostAndTimeList.forEach((delivery) => {
        const deliveryDetail = inputMap.get(delivery.id)
        if (deliveryDetail) {
            delivery.time = calculateTimePerTrip(speed, deliveryDetail.distance)
        }
    })
    return deliveryCostAndTimeList
}

export function printDeliveryCostAndTime(deliveryDetails: DeliveryDetail[], baseDeliveryCose: number, speed: number) {
    const deliveryCostSummary = generateDeliveryCostAndTime(deliveryDetails, baseDeliveryCose, speed)
    deliveryCostSummary.forEach((summary) => {
        console.log(summary.id + " " + summary.discount + " " + summary.totalCost + " " + summary.time)
    })
}