import { generateDeliveryCostAndTime, getDeliveryDetailById } from "../deliveryTime/service";
import { DeliveryCostAndTime, DeliveryDetail, Route } from "../interface";

const route: Route[] = []
let deliveryCostAndTimeList: DeliveryCostAndTime[]

function generateRouteId(index: number) {
    const id = index + 1
    return 'Route' + id
}

function calculateTripTime(packageList: string[]): number {
    const deliveryTimes: number[] = []
    packageList.forEach((pkg) => {
        const detail = getDeliveryDetailById(deliveryCostAndTimeList, pkg)
        if (detail) {
            deliveryTimes.push(detail.time)
        }
    })
    return Math.max(...deliveryTimes)
}

function packageGrouping(deliveryDetails: DeliveryDetail[], maxLoad: number) {
    if (!deliveryDetails?.length) return [] 
    let addedToRoute = new Set<string>()
    
    for (let currentIndex = 0; currentIndex < deliveryDetails.length; currentIndex++) {
        let packageList: string[] = []
        let currentLoad = deliveryDetails[currentIndex].weight
        if (addedToRoute.has(deliveryDetails[currentIndex].id)) continue
        packageList.push(deliveryDetails[currentIndex].id)
        addedToRoute.add(deliveryDetails[currentIndex].id)
        for (let searchIndex = 0; searchIndex < deliveryDetails.length; searchIndex++) {
            if (currentIndex !== searchIndex 
                && !addedToRoute.has(deliveryDetails[searchIndex].id)
                && (currentLoad + deliveryDetails[searchIndex].weight <= maxLoad)) 
            {
                packageList.push(deliveryDetails[searchIndex].id)
                addedToRoute.add(deliveryDetails[searchIndex].id)
                currentLoad = currentLoad + deliveryDetails[searchIndex].weight
            }
        }
        route.push({
            id: '',
            pkgId: packageList,
            totalWeight: currentLoad,
            pkgDeliverTime: calculateTripTime(packageList),
            status: 'Pending'
        })
    }
}

function sortByTotalWeightDesc(route: Route[]) {
    return route.sort((a, b) =>
        a.totalWeight > b.totalWeight ? -1 : 1
    )
}

function sortByWeightDesc(deliveryDetails: DeliveryDetail[]) {
    return deliveryDetails.sort((a, b) =>
        a.weight > b.weight ? -1 : 1
    )
}

function updatePkgOrderandId() {
    for (let index = 0; index < route.length; index++) {
        route[index].order = index + 1
        route[index].id = generateRouteId(index)
    }
}

export function printRoute(value: Route[]) {
    console.log('----------------------------------------------------------')
    value.forEach((r) => {
        console.log(r.id + '\t' + r.pkgId + '\t' + r.totalWeight + '\t' + r.pkgDeliverTime + '\t' + r.status)
    })
    console.log('----------------------------------------------------------')
}

export function getFastestReturningRoute(route: Route[]) {
    let fastestRoute
    let fastestTime = Number.MAX_VALUE
    route.forEach((r) => {
        if (r?.status === 'Delivering' && r.pkgDeliverTime < fastestTime) {
            fastestTime = r.pkgDeliverTime
            fastestRoute = r
        }
    })
    if (fastestTime != Number.MAX_VALUE) {
        return fastestRoute
    }
    return
}

export function updateRouteStatus(route: Route[], id: string, status: string, currentTime?: number) {
    route.forEach(r => {
        if (r.id === id) {
            r.status = status
            if (currentTime !== undefined) {
                r.pkgDeliverBy = r.pkgDeliverTime + currentTime
            }
        }
    })
    return route
}

export function getNextPendingRoute(route: Route[]) {
    return route.find(r => {
        return r.status === 'Pending'
    })
}

export function generateRoute(deliveryDetails: DeliveryDetail[], maxLoad: number, baseDeliveryCose: number, speed: number) {
    deliveryCostAndTimeList = generateDeliveryCostAndTime(deliveryDetails, baseDeliveryCose, speed)
    sortByWeightDesc(deliveryDetails)
    packageGrouping(deliveryDetails, maxLoad)
    sortByTotalWeightDesc(route)
    updatePkgOrderandId()
    console.log('------------------Generating Route------------------------')
    printRoute(route)
    return route
}