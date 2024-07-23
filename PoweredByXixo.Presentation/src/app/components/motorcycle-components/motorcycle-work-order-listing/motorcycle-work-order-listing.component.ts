import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WorkOrder } from '../../../models/work-order.model';
import { Motorcycle } from '../../../models/motorcycle.model';
import { WorkOrderService } from '../../../services/work-order-service/work-order.service';

@Component({
  selector: 'app-motorcycle-work-order-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motorcycle-work-order-listing.component.html',
  styleUrl: './motorcycle-work-order-listing.component.css'
})
export class MotorcycleWorkOrderListingComponent {
  @Input() moto: Motorcycle = new Motorcycle();
  motorcycleWorkOrders: WorkOrder[] = [];
  
  constructor(private _woService: WorkOrderService) {}

  ngOnInit() {
    this._woService.retrieveByMotorcycle(this.moto).subscribe(
      data => {
        this.motorcycleWorkOrders = data;
      },
      err => {
        console.log(err)
      },
      () => {
        console.log("Retrieved WorkOrders From Motorcycle: ", this.moto.licensePlate)
      });
  }
}
