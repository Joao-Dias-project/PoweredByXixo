import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '../../models/client.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string;
  private _hasFilter: boolean = false;
  private _actionState = new BehaviorSubject<string>("wainting");
  private _client = new Client();
  private _filter = new Client();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.url = 'https://localhost:7205/api/Client';
  }

  retrieveAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  retrieveByFilter(): Observable<Client[]> {
    const url = `${this.url}/filter`;
    let params = new HttpParams();

    if (this._filter.name) {
      params = params.set('name', this._filter.name);
    }
    if (this._filter.email) {
      params = params.set('email', this._filter.email);
    }
    if (this._filter.phoneNumber) {
      params = params.set('phoneNumber', this._filter.phoneNumber);
    }
    if (this._filter.taxNumber) {
      params = params.set('taxNumber', this._filter.taxNumber);
    }

    return this.http.get<Client[]>(url, { params });
  }

  public create(client: Client) {
    this.http.post(this.url, client).subscribe(
      data => {
        this.setActionState("created");
        console.log(data)
        this._snackBar.open('Registo adicionado com sucesso', 'OK', {
          duration: 5000,
        });
      },
      err => {
        console.error("Error creating client:", err);
      },
      () => {
        console.log("Create operation completed")
      });
  }

  public update(client: Client) {
    this.http.put(this.url, client).subscribe(
      data => {
        this.setActionState("updated");
        console.log(data)
        this._snackBar.open('Registo alterado com sucesso', 'OK', {
          duration: 5000,
        });
      },
      err => {
        console.error("Error updating client:", err);
      },
      () => {
        console.log("Update operation completed")
      });
  }

  public delete(client: Client) {
    const deleteUrl = `${this.url}/clientId/${client.id}`;

    this.http.delete(deleteUrl).subscribe(
      () => {
        this.setActionState("deleted");
        console.log("Delete successful");
        this._snackBar.open('Registo apagado com sucesso', 'OK', {
          duration: 5000,
        });
      },
      err => {
        console.error("Error deleting client:", err);
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

  public getClient() {
    return this._client;
  }

  public setClient(client: Client) {
    this._client = client;
  }

  public setFilter(filter: Client) {
    this._filter = filter;
  }

  public setHasFitler(hasFilter: boolean) {
    this._hasFilter = hasFilter;
  }

  public getHasFitler() {
    return this._hasFilter;
  }
}
