import { DeliveryDetail } from "./interface"

export const baseDeliveryCose = 100
export const maxSpeed = 70
export const maxLoad = 200
export const vehicleNumber = 2
export const inputChallenge1: DeliveryDetail[] = [
  {
      id: 'PKG1',
      weight: 5,
      distance: 5,
      offerCode: 'OFR001'
  },
  {
      id: 'PKG2',
      weight: 15,
      distance: 5,
      offerCode: 'OFR002'
  },
  {
      id: 'PKG3',
      weight: 10,
      distance: 100,
      offerCode: 'OFR003'
  }
]

export const inputChallenge2: DeliveryDetail[] = [
  {
      id: 'PKG1',
      weight: 50,
      distance: 30,
      offerCode: 'OFR001'
  },
  {
      id: 'PKG2',
      weight: 75,
      distance: 125,
      offerCode: 'OFR008'
  },
  {
      id: 'PKG3',
      weight: 175,
      distance: 100,
      offerCode: 'OFR003'
  },
  {
      id: 'PKG4',
      weight: 110,
      distance: 60,
      offerCode: 'OFR002'
  },
  {
      id: 'PKG5',
      weight: 155,
      distance: 95,
      offerCode: undefined
  }
]
