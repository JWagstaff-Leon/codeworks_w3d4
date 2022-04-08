import { ProxyState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class Trip{
    constructor( { id, name, description } )
    {
        if(!name)
        {
            throw new Error("New trips need a name");
        }
        if(!description)
        {
            throw new Error("New trips need a description");
        }

        this.id = id || generateId();
        this.name = name;
        this.description = description;
    }

    // REVIEW add delete button?
    get Template()
    {
        let template = "";
        template += `
        <li class="nav-item ${ProxyState.currentTripId == this.id ? 'bg-secondary text-dark' : 'bg-transparent text-light'}" title="${this.description}" onclick="app.tripsController.selectTrip('${this.id}')">
            <div class="border border-secondary px-2">
                <h3>${this.name}</h3>
            </div>
        </li>`;

        return template;
    }

    get Cost()
    {
        let totalCost = 0;
        const reservations = ProxyState.reservations.filter(r => r.tripId === this.id);
        reservations.forEach(r => totalCost += r.cost);
        return totalCost;
    }
}