import { ProxyState } from "../AppState.js";
import { Reservation } from "../Models/Reservation.js";

class ReservationsService
{
    addReservation(reservationData)
    {
        const newReservation = new Reservation(reservationData);
        ProxyState.reservations = [...ProxyState.reservations, newReservation];
    }

    deleteReservation(id)
    {
        ProxyState.reservations = ProxyState.reservations.filter(r => r.id !== id);
    }
}

export const reservationsService = new ReservationsService();