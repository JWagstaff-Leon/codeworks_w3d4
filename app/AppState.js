import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"

class AppState extends EventEmitter {
  /**@type {import('./Models/Trip').Trip[]} */
  trips = []

  /**@type {import('./Models/Reservation').Reservation[]} */
  reservations = []
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
