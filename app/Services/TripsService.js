import { ProxyState } from "../AppState.js";
import { reservationsService } from "./ReservationsService.js";
import { Trip } from "../Models/Trip.js";

class TripsService
{
    selectTrip(id)
    {
        ProxyState.currentTrip = id;
    }

    createTrip(tripData)
    {
        const newTrip = new Trip(tripData);
        ProxyState.trips = [...ProxyState.trips, newTrip];
        ProxyState.currentTrip = newTrip.id;
    }

    deleteTrip(id)
    {
        // delete every reservation which is part of the trip before the trip is deleted
        const removedReservations = ProxyState.reservations.filter(r => r.tripId === id);
        removedReservations.forEach(r => reservationsService.deleteReservation(r.id));

        // then delete the trip
        ProxyState.trips = ProxyState.trips.filter(t => t.id !== id);
        ProxyState.currentTrip = null;
    }
}

export const tripsService = new TripsService();