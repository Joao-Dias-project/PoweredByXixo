import { Component, ElementRef, OnInit } from '@angular/core';
import { WorkOrder } from '../../../models/work-order.model';
import { WorkOrderService } from '../../../services/work-order-service/work-order.service'; 
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Client } from '../../../models/client.model';
import { WorkOrderUpdateComponent } from '../work-order-update/work-order-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-work-order-listing',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './work-order-listing.component.html',
  styleUrls: ['./work-order-listing.component.css']
})

export class WorkOrderListingComponent {
  workOrders: WorkOrder[] = [];
  private _subscription!: Subscription;

  constructor(private _service: WorkOrderService, private _woUpdateDialog: MatDialog) { }

  ngOnInit() {
    this._subscription = this._service.getActionState().subscribe(state => {
      if (this._service.getHasFitler()) {
        this._service.retrieveByFilter().subscribe(
          data => {
            this.workOrders = data;
          },
          err => {
            console.log(err)
          },
          () => {
            console.log("Completed")
          });
      } else {
        this._service.retrieveAll().subscribe(
          data => {
            this.workOrders = data;
          },
          err => {
            console.log(err)
          },
          () => {
            console.log("Completed")
          });
      }
    });
  }

  select(wo: WorkOrder) {
    this._woUpdateDialog.open(WorkOrderUpdateComponent, { position: { top: '85px' }, data: { woToUpdate: wo } });
  }
}
