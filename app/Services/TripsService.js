import { ProxyState } from "../AppState.js";
import { reservationsService } from "./ReservationsService.js";

class TripsService
{
    addTrip(tripData)
    {
        const newTrip = new Trip(tripData);
        ProxyState.Trips = [...ProxyState.Trips, newTrip];
        ProxyState.currentTrip = newTrip.id;
    }

    deleteTrip(id)
    {
        // delete every reservation which is part of the trip before the trip is deleted
        const removedReservations = ProxyState.reservations.filter(r => r.tripId === id);
        removedReservations.forEach(r => reservationsService.deleteReservation(r.id));

        // then delete the trip
        ProxyState.Trips = ProxyState.Trips.filter(t => t.id !== id);
        ProxyState.currentTrip = null;
    }
}

export const tripsService = new TripsService();