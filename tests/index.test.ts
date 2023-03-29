import { printDeliverySummary } from '../src/cost/service';
import { printDeliveryCostAndTime } from '../src/deliveryTime/service';
import { DeliveryDetail } from '../src/interface';
import { generateRoute } from '../src/route/service';
import { assignVehicles, generateVehicles, updateDeliveryAsDone } from '../src/vehicles/service';

const baseDeliveryCose = 100
const maxSpeed = 70
const maxLoad = 200
const inputChallenge1: DeliveryDetail[] = [
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

const inputChallenge2: DeliveryDetail[] = [
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
 
describe('testing index file', () => {
  test('empty string should result in zero', () => {
    printDeliverySummary(inputChallenge1, baseDeliveryCose)
    printDeliveryCostAndTime(inputChallenge2, baseDeliveryCose, maxSpeed)
    let route = generateRoute(inputChallenge2, maxLoad, baseDeliveryCose, maxSpeed)
    generateVehicles(2)
    route = assignVehicles(route)
    route = assignVehicles(route)
    route = assignVehicles(route)
    route = updateDeliveryAsDone(route)
    route = updateDeliveryAsDone(route)
    route = assignVehicles(route)
    route = assignVehicles(route)
    route = updateDeliveryAsDone(route)
    route = updateDeliveryAsDone(route)
  });
});
