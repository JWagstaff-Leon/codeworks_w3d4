import { generateId } from "../Utils/generateId.js";

export class Reservation
{
    constructor( { id, type, tripId, name, confirmationNumber, address, startDate, notes, cost } )
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
        if(!confirmationNumber)
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
        this.confirmationNumber = confirmationNumber;
        this.address = address;
        this.startDate = startDate;
        this.notes = notes || "";
        this.cost = cost;
    }

    // REVIEW add delete button?
    get Template()
    {
        let template = "";

        template +=
        `
        <div class="row bg-secondary text-black py-1 text-center">
            <div class="col"><i class="mdi mdi-${this.type} text-dark"></i></div>
            <div class="col">${this.name}</div>
            <div class="col">${this.confirmationNumber}</div>
            <div class="col">${this.address}</div>
            <div class="col">${this.startDate}</div>
            <div class="col"><button class="btn btn-transparent text-dark" data-bs-toggle="modal" data-bs-target="#notes-modal" onclick="app.tripsController.drawNotes('${this.id}')"><i class="mdi ${ this.notes.length == 0 ? "mdi-note-outline" : "mdi-note-edit-outline"}"></i></button></div>
            <div class="col">$${this.cost}</div>
        </div>
        `;

        return template;
    }
}