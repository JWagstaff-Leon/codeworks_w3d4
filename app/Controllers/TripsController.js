import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";
import { reservationsService } from "../Services/ReservationsService.js";

// the list of trips across the top
function _drawTrips() {
  let template = ''
  ProxyState.trips.forEach(t => template += t.Template)

  //add the addTripButton
  // REVIEW touch up this button
  template +=
  `
  <div class="col">
    <button class="btn btn-primary text-center d-flex align-items-center" title="Add New Trip" data-bs-toggle="modal" data-bs-target="#modal"><i class="mdi mdi-plus-thick></i></button>
  </div>
  `;

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
    ProxyState.on('currentTrip', _drawTrips)
    ProxyState.on('currentTrip', _drawReservations)
    _drawTrips()
    _drawReservations()
  }

  selectTrip(id)
  {
    try
    {

    tripsService.selectTrip(id);
    }
    catch(error)
    {
        console.error('SELECT TRIP ERROR', error.message);
    }
  }

  createTrip() {
    window.event.preventDefault()
    try {
      /**@type {HTMLFormElement} */
      // @ts-ignore
      const form = window.event.target
      const tripData = {
        // @ts-ignore
        name: form.name.value,
        description: form.description.value
      }
      tripsService.createTrip(tripData)
    } catch (error) {
      console.error('ADD TRIP ERROR', error)
    }
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
        // @ts-ignore
        const form = window.event.target;

        const reservationData =
        {
            // @ts-ignore
            id: form.id.value,
            type: form.type.value,
            tripId: form.tripId.value,
            // @ts-ignore
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