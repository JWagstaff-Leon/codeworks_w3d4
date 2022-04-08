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
  <li class="col align-self-center ms-2">
    <button class="btn btn-primary text-center d-flex align-items-center" title="Add New Trip" data-bs-toggle="modal" data-bs-target="#modal"><i class="mdi mdi-plus-thick"></i></button>
  </li>
  `;

  document.getElementById('trips').innerHTML = template
}

// the list of reservations within a trip tab
function _drawReservations() {
  let template = ''
  template += 
  `
  <div class="row bg-secondary text-black py-2">
        <div class="col text-center"><h5>Type</h5></div>
        <div class="col text-center"><h5>Name</h5></div>
        <div class="col text-center"><h5>Confirmation Number</h5></div>
        <div class="col text-center"><h5>Address</h5></div>
        <div class="col text-center"><h5>Date</h5></div>
        <div class="col text-center"><h5>Notes</h5></div>
        <div class="col text-center"><h5>Cost</h5></div>
    </div>
  `;
    const tripReservations = ProxyState.reservations.filter(r => r.tripId === ProxyState.currentTripId);

  tripReservations.forEach(r => template += r.Template);
  document.getElementById('reservations').innerHTML = template;

    const currentTrip = ProxyState.trips.find(t => t.id === ProxyState.currentTripId);
    if(currentTrip)
    {
        document.getElementById("total-cost").innerText = currentTrip.Cost;
    }
}

export class TripsController {
  constructor() {
    //if we add or delete trips, redraw the trips
    ProxyState.on('trips', _drawTrips)

    //if we add or delete reservations, redraw the reservations
    ProxyState.on('reservations', _drawReservations)

    //if we change the current trip, redraw the trips and reservations
    ProxyState.on('currentTripId', _drawTrips)
    ProxyState.on('currentTripId', _drawReservations)
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
            type: form.type.value,
            tripId: ProxyState.currentTripId,
            // @ts-ignore
            name: form.name.value,
            confirmationNumber: form.confirmationNumber.value,
            address: form.address.value,
            startDate: form.startDate.value,
            cost: +form.cost.value
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