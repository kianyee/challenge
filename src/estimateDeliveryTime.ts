import { baseDeliveryCose, inputChallenge2, maxLoad, maxSpeed, vehicleNumber } from "./input"
import { generateRoute } from "./route/service"
import { assignVehicles, generateVehicles, updateDeliveryAsDone } from "./vehicles/service"

let route = generateRoute(inputChallenge2, maxLoad, baseDeliveryCose, maxSpeed)
generateVehicles(vehicleNumber)
route = assignVehicles(route)
route = assignVehicles(route)
// test if no more vehicle
route = assignVehicles(route)
route = updateDeliveryAsDone(route)
route = updateDeliveryAsDone(route)
route = assignVehicles(route)
route = assignVehicles(route)
route = updateDeliveryAsDone(route)
route = updateDeliveryAsDone(route)