export class Client {
    constructor(){
        this.id;
        this.invoiceId = '',
        this.name = '',
        this.address = '',
        this.email = '',
        this.postalCode = '',
        this.location = '',
        this.phoneNumber = '',
        this.taxNumber = ''
    }

    id?: number;
    invoiceId: string;
    name: string;
    address: string; 
    email: string;
    postalCode: string;
    location: string;
    phoneNumber: string;
    taxNumber: string;

    toString() {
        return JSON.stringify(this);
    }
}

