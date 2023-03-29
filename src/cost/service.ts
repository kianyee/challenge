import { DeliveryCost, DeliveryDetail } from "../interface"
import { getDiscount } from "../offers/service"
import { DISTANCE_MUTIPLIER, WEIGHT_MULTIPLIER } from "./constants"

function calcluateCost(baseDeliveryCose: number, weight: number, distance: number) {
    return baseDeliveryCose + weight * WEIGHT_MULTIPLIER + distance * DISTANCE_MUTIPLIER
}

function calculateDiscount(cost: number, discount: number) {
    return cost * discount / 100
}

function generateDeliveryCost(baseDeliveryCose: number, id: string, weight: number, offerCode: string | undefined, distance: number): DeliveryCost {
    const discountFromOfrCode = offerCode ? getDiscount(distance, weight, offerCode) : 0
    const cost = calcluateCost(baseDeliveryCose, weight, distance)
    const totalDiscount = calculateDiscount(cost, discountFromOfrCode)
    return {
        id,
        discount: totalDiscount,
        totalCost: cost - totalDiscount
    }
}

export function generateDeliverySummary(deliveryDetails: DeliveryDetail[], baseDeliveryCose: number):DeliveryCost[] {
    const deliveryCostSummary: DeliveryCost[] = []
    deliveryDetails.forEach((detail) => {
        if (detail.distance > 0 && detail.weight > 0) {
            deliveryCostSummary.push(
                generateDeliveryCost(baseDeliveryCose, detail.id, detail.weight, detail?.offerCode, detail.distance)
            )
        }
    })
    return deliveryCostSummary
}

export function printDeliverySummary(deliveryDetails: DeliveryDetail[], baseDeliveryCose: number) {
    const deliveryCostSummary = generateDeliverySummary(deliveryDetails, baseDeliveryCose)
    deliveryCostSummary.forEach((summary) => {
        console.log(summary.id + " " + summary.discount + " " + summary.totalCost)
    })
}