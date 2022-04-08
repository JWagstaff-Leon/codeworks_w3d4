import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"

// @ts-ignore
const trip1 = new Trip({name: "trip1", description: "this is a trip", id: "hi"});
// @ts-ignore
const trip2 = new Trip({name: "trip2", description: "this is a trip", id: "hi"});
// @ts-ignore
const trip3 = new Trip({name: "trip3", description: "this is a trip", id: "hi"});
// @ts-ignore
const trip4 = new Trip({name: "trip4", description: "this is a trip", id: "hi"});
// @ts-ignore
const trip5 = new Trip({name: "trip5", description: "this is a trip", id: "hi"});

// @ts-ignore
const res1 = new Reservation({type: 'Business', name: 'Frank', confirmationNumber: 'AO24lON', address: '134 Any Way', startDate: '03/04/23', notes: 'notey', cost: 600, tripId: 'hi'})
// @ts-ignore
const res2 = new Reservation({type: 'Vacation', name: 'Jerry', confirmationNumber: 'POJN42N', address: '163 No Way', startDate: '10/31/22', notes: 'notey2', cost: 500, tripId: 'hi'})
// @ts-ignore
const res3 = new Reservation({type: 'Moving', name: 'Louis', confirmationNumber: 'UHNG42N', address: '985 Free Way', startDate: '08/18/22', notes: 'notey3', cost: 1000, tripId: 'hi'})
// @ts-ignore
const res4 = new Reservation({type: 'Vacation', name: 'Sarah', confirmationNumber: 'RESC98N', address: '513 Lee Way', startDate: '06/21/23', notes: 'notey4', cost: 700, tripId: 'hi'})
// @ts-ignore
const res5 = new Reservation({type: 'Business', name: 'Irene', confirmationNumber: 'ESXC95N', address: '230 Hi Way', startDate: '04/05/23', notes: 'notey5', cost: 800, tripId: 'hi'})

class AppState extends EventEmitter {
  /**@type {import('./Models/Trip').Trip[]} */
  trips = [trip1, trip2, trip3, trip4, trip5]

  /**@type {import('./Models/Reservation').Reservation[]} */
  reservations = [res1, res2, res3, res4, res5]

  currentTripId = null;
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
