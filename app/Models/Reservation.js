import { generateId } from "../Utils/generateId.js";

export class Reservation
{
    constructor( { id, type, tripId, name, confimationNumber, address, startDate, notes, cost } )
    {
        if(!type)
        {
            throw new Error("New reservations need a type");
        }
        if(!tripId)
        {
            throw new Error("New reservations need a parent trip id");
        }
        if(!name)
        {
            throw new Error("New reservations need a name");
        }
        if(!confimationNumber)
        {
            throw new Error("New reservations need a confirmation number");
        }
        if(!address)
        {
            throw new Error("New reservations need an address");
        }
        if(!startDate)
        {
            throw new Error("New reservations need a start date");
        }
        if(!cost)
        {
            throw new Error("New reservations need a cost");
        }
        
        this.id = id || generateId();
        this.type = type;
        this.tripId = tripId;
        this.name = name;
        this.confimationNumber = confimationNumber;
        this.address = address;
        this.startDate = startDate;
        this.notes = notes || "";
        this.cost = cost;
    }

    get Template()
    {
        let template = "";
        //TODO make a template
        // NOTE will be a single row with:
        // this.type turned into an ico through a switch
        // this.name
        // this.confirmationNumber
        // this.address
        // this.date
        // a button to open a modal of this.notes
        // this.cost

        return template;
    }
}