import { DeliveryDetail } from "../interface";

export function generateInputMap(deliveryDetails: DeliveryDetail[]): Map<string, DeliveryDetail> {
    const inputMap: Map<string, DeliveryDetail> = new Map()
    deliveryDetails.forEach((detail) => {
        inputMap.set(detail.id, detail)
    })
    return inputMap
}