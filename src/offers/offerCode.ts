import { OfferDetail } from "../interface"

const offerTenPercent: OfferDetail = {
    discount: 10,
    distanceStart: 0,
    distanceEnd: 200,
    weightStart: 70,
    weightEnd: 200
}

const offerSeventPercent: OfferDetail = {
    discount: 7,
    distanceStart: 50,
    distanceEnd: 150,
    weightStart: 100,
    weightEnd: 250
}

const offerFivePercent: OfferDetail = {
    discount: 5,
    distanceStart: 50,
    distanceEnd: 250,
    weightStart: 10,
    weightEnd: 150
}

export const OfferCodeMap = new Map<string, OfferDetail>([
    ["OFR001", offerTenPercent],
    ["OFR002", offerSeventPercent],
    ["OFR003", offerFivePercent]
])
