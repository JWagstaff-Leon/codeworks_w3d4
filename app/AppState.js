import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"

const trip1 = new Trip({name: "trip1", description: "this is a trip"});
const trip2 = new Trip({name: "trip2", description: "this is a trip"});
const trip3 = new Trip({name: "trip3", description: "this is a trip"});
const trip4 = new Trip({name: "trip4", description: "this is a trip"});
const trip5 = new Trip({name: "trip5", description: "this is a trip"});

class AppState extends EventEmitter {
  /**@type {import('./Models/Trip').Trip[]} */
  trips = [trip1, trip2, trip3, trip4, trip5]

  /**@type {import('./Models/Reservation').Reservation[]} */
  reservations = []

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
