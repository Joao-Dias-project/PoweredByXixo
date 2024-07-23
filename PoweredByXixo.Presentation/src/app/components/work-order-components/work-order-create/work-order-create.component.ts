import { Component } from '@angular/core';
import { WorkOrder } from '../../../models/work-order.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkOrderService } from '../../../services/work-order-service/work-order.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WorkOrderClientSelectComponent } from '../work-order-client-select/work-order-client-select.component';
import { Client } from '../../../models/client.model';
import { WorkOrderMotorcycleSelectComponent } from '../work-order-motorcycle-select/work-order-motorcycle-select.component';
import { Motorcycle } from '../../../models/motorcycle.model';

@Component({
  selector: 'app-work-order-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-order-create.component.html',
  styleUrl: './work-order-create.component.css'
})
export class WorkOrderCreateComponent {
  wo : WorkOrder = new WorkOrder();
  errorMessage: string | null = null;

  constructor(private _service: WorkOrderService, private _selectDialog: MatDialog, private _woCreateDialogRef: MatDialogRef<WorkOrderCreateComponent>){

    const year = this.wo.date.getFullYear();
    const month = this.wo.date.getMonth() + 1 ;
    const day = this.wo.date.getDate();

    const onlyDate : unknown = <unknown>year.toString()+ "-" + month.toString().padStart(2, '0') + "-" + day.toString();
    
    this.wo.date = <Date>onlyDate;
  }

  submit() {
    if (this.wo.client.phoneNumber == '') {
      this.errorMessage = "Seleccionar um cliente";
    }
    else if (this.wo.motorcycle.licensePlate == '') {
      this.errorMessage = "Seleccionar uma mota";
    } else {
      this.wo.dateStart = this.wo.date;
      this._service.create(this.wo);
      this._woCreateDialogRef.close();
    }
  }

  closeDialog() {
    this._woCreateDialogRef.close();
  }

  dialogFactory(objectSelecting : string){
    if(objectSelecting == "client"){

      const dialogRef = this._selectDialog.open(WorkOrderClientSelectComponent, { position: { top: '85px' } });
  
      dialogRef.afterClosed().subscribe((client: Client) => {
        if (client) {this.wo.client = client;}
      });
      
    }else if(objectSelecting == "motorcycle"){

      const dialogRef = this._selectDialog.open(WorkOrderMotorcycleSelectComponent, { position: { top: '85px' } });
  
      dialogRef.afterClosed().subscribe((moto: Motorcycle) => {
        if (moto) {this.wo.motorcycle = moto;}
      });
    }
  }

  onBlur() {
    if (this.wo.client.phoneNumber == '') {
      this.errorMessage = "Cliente é obrigatório";
    } else if (this.wo.motorcycle.licensePlate == '') {
      this.errorMessage = "Mota é obrigatório";
    }
    else {
      this.errorMessage = null;
    }
  }
}
