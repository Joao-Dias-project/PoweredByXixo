import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkOrder } from '../../models/work-order.model'; 
import { Client } from '../../models/client.model';
import { Motorcycle } from '../../models/motorcycle.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private url = 'https://localhost:7205/api/WorkOrder';
  private _actionState = new BehaviorSubject<string>("wainting");
  private _createFilterState = new BehaviorSubject<string>("wainting");
  private _client = new Client();
  private _motorcycle = new Motorcycle();
  private _hasFilter: boolean = false;
  private _workOrder = new WorkOrder();
  private _filter = new WorkOrder();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  retrieveAll(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.url);
  }

  retrieveByFilter(): Observable<WorkOrder[]> {
    const url = `${this.url}/filter`;
    let params = new HttpParams();

    if (this._filter.id) {
      params = params.set('id', this._filter.id);
    }
    if (this._filter.client.id) {
      params = params.set('clientId', this._filter.client.id);
    }
    if (this._filter.motorcycle.id) {
      params = params.set('motorcycleId', this._filter.motorcycle.id);
    }
    if (this._filter.dateStart) {
      params = params.set('dateStart', this._filter.dateStart.toString());
    }
    if (this._filter.date) {
      params = params.set('date', this._filter.date.toString());
    }

    return this.http.get<WorkOrder[]>(url, { params });
  }

  public create(wo: WorkOrder) {
    console.log(wo)
    this.http.post(this.url, wo).subscribe(
      data => {
        this.setActionState("created");
        console.log(data)
        this._snackBar.open('Registo adicionado com sucesso', 'OK', {
          duration: 5000,
        });
      },
      err => {
        console.error("Error creating workOrder:", err);
      },
      () => {
        console.log("Create operation completed")
      });
  }

  public update(wo: WorkOrder){
    this.http.put(this.url, wo).subscribe(
        data => {
            this.setActionState("updated");
            console.log(data)
            this._snackBar.open('Registo alterado com sucesso', 'OK', {
                duration: 5000,
              });
        },
        err => {
            console.error("Error updating WorkOrder:", err);
        },
        () => {
            console.log("Update operation completed")
        });
}

public delete(wo: WorkOrder) {
    const deleteUrl = `${this.url}/workOrderId/${wo.id}`;
  
    this.http.delete(deleteUrl).subscribe(
      () => {
        this.setActionState("deleted");
        console.log("Delete successful");
        this._snackBar.open('Registo apagado com sucesso', 'OK', {
            duration: 5000,
          });
      },
      err => {
        console.error("Error deleting WorkOrder:", err);
      },
      () => {
        console.log("Delete operation completed");
      }
    );
  }

  retrieveByMotorcycle(moto: Motorcycle): Observable<WorkOrder[]> {
    console.log(`${this.url}/motorcycleId/${moto.id}`);
    return this.http.get<WorkOrder[]>(`${this.url}/motorcycleId/${moto.id}`);
  }

  public setActionState(state: string) {
    this._actionState.next(state);
  }

  public getActionState(): Observable<string> {
    return this._actionState.asObservable();
  }

  public setCreateFilterState(state: string) {
    this._createFilterState.next(state);
  }

  public getCreateFilterState(): Observable<string> {
    return this._createFilterState.asObservable();
  }

  public getClient() {
    return this._client;
  }

  public setClient(client: Client) {
    this._client = client;
  }

  public getMotorcycle() {
    return this._motorcycle;
  }

  public setMotorcycle(moto: Motorcycle) {
    this._motorcycle = moto;
  }

  public getWorkOrder() {
    return this._workOrder;
  }

  public setWorkOrder(wo: WorkOrder) {
    this._workOrder = wo;
  }

  public setFilter(filter: WorkOrder) {
    this._filter = filter;
  }

  public setHasFitler(hasFilter: boolean) {
    this._hasFilter = hasFilter;
  }

  public getHasFitler() {
    return this._hasFilter;
  }
}
