import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkOrderService } from '../../../services/work-order-service/work-order.service';
import { debounceTime, Subscription } from 'rxjs';
import { Motorcycle } from '../../../models/motorcycle.model';
import { MatDialog } from '@angular/material/dialog';
import { WorkOrderClientSelectComponent } from '../work-order-client-select/work-order-client-select.component';
import { WorkOrderMotorcycleSelectComponent } from '../work-order-motorcycle-select/work-order-motorcycle-select.component';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-work-order-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './work-order-filter.component.html',
  styleUrl: './work-order-filter.component.css'
})
export class WorkOrderFilterComponent {
  filterForm: FormGroup
  private _subscription!: Subscription;
  clientName: string = '';
  licensePlate: string = '';

  constructor(private fb: FormBuilder, private _service: WorkOrderService, private _selectDialog: MatDialog) {
    this.filterForm = this.fb.group({
      id: [''],
      client: [''],
      motorcycle: [''],
      dateStart: [''],      
      date: [''],
    });
  }

  ngOnInit() {
    this._subscription = this.filterForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this._service.setHasFitler(true);
      this._service.setFilter(this.filterForm.value);
      this._service.setActionState("refresh");
    })
  }

  clearForm() {
    this.filterForm.reset({
      id: [''],
      client: [''],
      motorcycle: [''],
      dateStart: [''],
      date: [''],
    });
    this.clientName = ''; 
    this.licensePlate = '';
    this._service.setHasFitler(false);
    this._service.setActionState("refresh");
  }

  dialogFactory(objectSelecting: string) {
    if(objectSelecting == "client"){

      const dialogRef = this._selectDialog.open(WorkOrderClientSelectComponent, { position: { top: '85px' } });
  
      dialogRef.afterClosed().subscribe((client: Client) => {
        if (client) {
          this.filterForm.patchValue({client : client});
          this.clientName = client.name;
        }
      });
      
    }else if(objectSelecting == "motorcycle"){

      const dialogRef = this._selectDialog.open(WorkOrderMotorcycleSelectComponent, { position: { top: '85px' } });
  
      dialogRef.afterClosed().subscribe((moto: Motorcycle) => {
        if (moto) {
          this.filterForm.patchValue({motorcycle : moto});
          this.licensePlate = moto.licensePlate;
        }
      });
    }
  }
}
