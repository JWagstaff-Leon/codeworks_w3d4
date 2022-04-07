import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";
import { reservationsService } from "../Services/ReservationsService.js";

// the list of trips across the top
function _drawTrips() {
  let template = ''
  ProxyState.trips.forEach(t => template += t.Template)
  document.getElementById('trips').innerHTML = template
}

// the list of reservations within a trip tab
function _drawReservations() {
  let template = ''
  ProxyState.reservations.forEach(r => template += r.Template)
  document.getElementById('reservations').innerHTML = template
}

export class TripsController {
  constructor() {
    //if we add or delete trips, redraw the trips
    ProxyState.on('trips', _drawTrips)

    //if we add or delete reservations, redraw the reservations
    ProxyState.on('reservations', _drawReservations)

    //if we change the current trip, redraw the trips and reservations
    ProxyState.on('currentTrips', _drawTrips)
    ProxyState.on('currentTrips', _drawReservations)
    _drawTrips()
    _drawReservations()
  }

  createTrip() {
    window.event.preventDefault()
    try {
      /**@type {HTMLFormElement} */
      const form = window.event.target
      const tripData = {
        name: form.name.value,
        description: form.description.value
      }

    } catch (error) {
      console.error('ADD TRIP ERROR', error)
    }
    tripsService.createTrip(tripData)
  }
  deleteTrip(id) {
    try
    {
        tripsService.deleteTrip(id)
    }
    catch(error)
    {
        console.error('DELETE TRIP ERROR', error);
    }
  }
  
  createReservation()
  {
      window.event.preventDefault();
    try
    {
        /**@type {HTMLFormElement} */
        const form = window.event.target;

        const reservationData =
        {
            id: form.id.value,
            type: form.type.value,
            tripId: form.tripId.value,
            name: form.name.value,
            confimationNumber: form.confirmationNumber.value,
            address: form.address.value,
            startDate: form.startDate.value,
            notes: form.notes.value,
            cost: form.cost.value
        };

        reservationsService.createReservation(reservationData);
    }
    catch(error)
    {
        console.error('ADD RESERVATION ERROR', error.message);
    }
  }

  deleteReservation(id)
  {
    try
    {
        reservationsService.deleteReservation(id);
    }
    catch(error)
    {
        console.error('DELETE RESERVATION ERROR', error);
    }
  }
}