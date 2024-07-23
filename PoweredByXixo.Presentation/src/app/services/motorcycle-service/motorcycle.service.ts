import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';
import { Motorcycle } from '../../models/motorcycle.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class MotorcycleService {
    url: string;
    private _hasFilter: boolean = false;
    private _actionState = new BehaviorSubject<string>("wainting");
    private _motorcycle = new Motorcycle();
    private _filter = new Motorcycle();
    private _client = new Client();

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
        this.url = 'https://localhost:7205/api/Motorcycle';
    }

    retrieveAll(): Observable<Motorcycle[]> {
        return this.http.get<Motorcycle[]>(this.url);
    }

    retrieveByFilter(): Observable<Motorcycle[]> {
        const url = `${this.url}/filter`;
        let params = new HttpParams();

        if (this._filter.make) {
            params = params.set('make', this._filter.make);
        }
        if (this._filter.model) {
            params = params.set('model', this._filter.model);
        }
        if (this._filter.licensePlate) {
            params = params.set('licensePlate', this._filter.licensePlate);
        }
        if (this._filter.vin) {
            params = params.set('vin', this._filter.vin);
        }

        return this.http.get<Motorcycle[]>(url, { params });
    }

    retrieveByClient(client: Client): Observable<Motorcycle[]> {
         return this.http.get<Motorcycle[]>(`${this.url}/clientId/${client.id}`);
    }

    public create(moto: Motorcycle) {
        this.http.post(this.url, moto).subscribe(
            data => {
                this.setActionState("created");
                console.log(data)
                this._snackBar.open('Registo adicionado com sucesso', 'OK', {
                    duration: 5000,
                  });
            },
            err => {
                console.error("Error creating motorcycle:", err);
            },
            () => {
                console.log("Create operation completed")
            });
    }

    public update(moto: Motorcycle){
        this.http.put(this.url, moto).subscribe(
            data => {
                this.setActionState("updated");
                console.log(data)
                this._snackBar.open('Registo alterado com sucesso', 'OK', {
                    duration: 5000,
                  });
            },
            err => {
                console.error("Error updating motorcycle:", err);
            },
            () => {
                console.log("Update operation completed")
            });
    }

    public delete(moto: Motorcycle) {
        const deleteUrl = `${this.url}/motorcycleId/${moto.id}`;
      
        this.http.delete(deleteUrl).subscribe(
          () => {
            this.setActionState("deleted");
            console.log("Delete successful");
            this._snackBar.open('Registo apagado com sucesso', 'OK', {
                duration: 5000,
              });
          },
          err => {
            console.error("Error deleting motorcycle:", err);
          },
          () => {
            console.log("Delete operation completed");
          }
        );
      }

    public setActionState(state: string) {
        this._actionState.next(state);
    }

    public getActionState(): Observable<string> {
        return this._actionState.asObservable();
    }

    public getMotorcycle() {
        return this._motorcycle;
    }

    public setMotorcycle(moto: Motorcycle) {
        this._motorcycle = moto;
    }

    public setFilter(filter: Motorcycle){
        this._filter = filter;
    }
    
    public setHasFitler(hasFilter: boolean){
        this._hasFilter = hasFilter;
    }

    public getHasFitler() {
        return this._hasFilter;
    }

    public setClient(client: Client) {
        this._client = client;
    }
}
