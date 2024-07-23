export class Motorcycle {
    constructor(){
        this.id;
        this.make = '';
        this.model ='';
        this.licensePlate = '';
        this.vin = '';
        this.mileage = 0;
        this.year = 0;
    }

    id?: number;
    make: string;
    model: string;
    licensePlate: string; 
    vin: string;
    mileage: number;
    year: number;

    toString() {
        return JSON.stringify(this);
    }
}
