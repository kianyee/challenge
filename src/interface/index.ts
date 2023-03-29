export interface DeliveryDetail {
    id: string,
    weight: number,
    distance: number,
    offerCode: string | undefined
}

export interface DeliveryCost {
    id: string
    discount: number
    totalCost: number
}

export interface OfferDetail {
    discount: number
    distanceStart: number
    distanceEnd: number
    weightStart: number
    weightEnd: number
}

export interface DeliveryCostAndTime extends DeliveryCost {
    time: number
}

export interface Route {
    id: string
    pkgId: string[]
    totalWeight: number
    pkgDeliverTime: number
    status: string
    order?: number
    pkgDeliverBy?: number
}

export interface Vehicle {
    id: string
    routeId?: string
    returnTime?: number
}
