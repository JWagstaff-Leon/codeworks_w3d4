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

    get Template()
    {
        let template = "";
        template += `
        <div class="col ${ProxyState.currentTrip == this.id ? 'bg-secondary text-dark' : 'bg-transparent text-light'}" title="${this.description}" onclick="app.tripsController.selectTrip('${this.id}')">
            <div class="border border-secondary">
                <h3>${this.name}</h3>
            </div>
        </div>`
        // TODO make on a template
        // NOTE will be this.name in a div with a border
        // and will have a title attribute of this.description
        // onclick will become the current trip (this.id)
        // will be colored based on if it's the ProxyState.currentTrip

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