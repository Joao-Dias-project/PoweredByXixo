import { Motorcycle } from "./motorcycle.model";
import { Client } from "./client.model";

export class WorkOrder{
    constructor(){
        this.id;
        this.client = new Client();
        this.motorcycle = new Motorcycle();
        this.date = new Date();
        this.dateStart = new Date();
        this.mileage = 0;
        this.reportedIssues = '';
        this.workPerformed = '';
    }

    id?: number;
    client: Client;
    motorcycle: Motorcycle;
    date: Date;
    dateStart : Date;
    mileage: number;
    reportedIssues: string;
    workPerformed: string;
}