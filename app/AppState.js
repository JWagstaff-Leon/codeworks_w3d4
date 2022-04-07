import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"

const trip1 = new Trip({name: "trip1", description: "this is a trip"});
const trip2 = new Trip({name: "trip2", description: "this is a trip"});
const trip3 = new Trip({name: "trip3", description: "this is a trip"});
const trip4 = new Trip({name: "trip4", description: "this is a trip"});
const trip5 = new Trip({name: "trip5", description: "this is a trip"});

const res1 = new Reservation({type: 'Business', name: 'Frank', confimationNumber: 'AO24lON', address: '134 Any Way', startDate: '03/04/23', notes: 'notey', cost: 600})
const res2 = new Reservation({type: 'Vacation', name: 'Jerry', confimationNumber: 'POJN42N', address: '163 No Way', startDate: '10/31/22', notes: 'notey2', cost: 500})
const res3 = new Reservation({type: 'Moving', name: 'Louis', confimationNumber: 'UHNG42N', address: '985 Free Way', startDate: '08/18/22', notes: 'notey3', cost: 1000})
const res4 = new Reservation({type: 'Vacation', name: 'Sarah', confimationNumber: 'RESC98N', address: '513 Lee Way', startDate: '06/21/23', notes: 'notey4', cost: 700})
const res5 = new Reservation({type: 'Business', name: 'Irene', confimationNumber: 'ESXC95N', address: '230 Hi Way', startDate: '04/05/23', notes: 'notey5', cost: 800})

class AppState extends EventEmitter {
  /**@type {import('./Models/Trip').Trip[]} */
  trips = [trip1, trip2, trip3, trip4, trip5]

  /**@type {import('./Models/Reservation').Reservation[]} */
  reservations = [res1, res2, res3, res4, res5]

  currentTrip = null;
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
