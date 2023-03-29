import { OfferDetail } from "../interface";
import { OfferCodeMap } from "./offerCode";

function isDistanceValid(offerDetail: OfferDetail, distance: number): boolean {
    return distance >= offerDetail.distanceStart  && distance <= offerDetail.distanceEnd 
}

function isWeightValid(offerDetail: OfferDetail, weight: number): boolean {
    return weight >= offerDetail.weightStart  && weight <= offerDetail.weightEnd
}

function isDistanceAndWeightValid(offerDetail: OfferDetail, distance: number, weight: number): boolean {
    return isDistanceValid(offerDetail, distance) && isWeightValid(offerDetail, weight)
}

export function getDiscount(distance: number, weight: number, offerCode: string): number {
    const offerDetail = OfferCodeMap.get(offerCode)
    if (offerDetail) {
        return isDistanceAndWeightValid(offerDetail, distance, weight) ? offerDetail.discount : 0
    }
    return 0
}