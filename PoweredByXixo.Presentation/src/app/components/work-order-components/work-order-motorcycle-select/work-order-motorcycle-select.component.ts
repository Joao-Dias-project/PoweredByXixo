import { Component } from '@angular/core';
import { MotorcycleFilterComponent } from '../../motorcycle-components/motorcycle-filter/motorcycle-filter.component';
import { MotorcycleListingComponent } from '../../motorcycle-components/motorcycle-listing/motorcycle-listing.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Motorcycle } from '../../../models/motorcycle.model';

@Component({
  selector: 'app-work-order-motorcycle-select',
  standalone: true,
  imports: [MotorcycleFilterComponent, MotorcycleListingComponent],
  templateUrl: './work-order-motorcycle-select.component.html',
  styleUrl: './work-order-motorcycle-select.component.css'
})
export class WorkOrderMotorcycleSelectComponent {
  
  constructor(private _motoSelectDialogRef: MatDialogRef<WorkOrderMotorcycleSelectComponent>) { }

  ngOnInit() {
  }

  onMotorcycleSelected(moto: Motorcycle) {
    this._motoSelectDialogRef.close(moto);
  }

  closeDialog(){
    this._motoSelectDialogRef.close();
  }
}
