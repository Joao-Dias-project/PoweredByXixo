import { Component, Inject } from '@angular/core';
import { WorkOrderClientSelectComponent } from '../work-order-client-select/work-order-client-select.component';
import { WorkOrderMotorcycleSelectComponent } from '../work-order-motorcycle-select/work-order-motorcycle-select.component';
import { Client } from '../../../models/client.model';
import { Motorcycle } from '../../../models/motorcycle.model';
import { WorkOrderService } from '../../../services/work-order-service/work-order.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WorkOrder } from '../../../models/work-order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-order-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './work-order-update.component.html',
  styleUrl: './work-order-update.component.css'
})
export class WorkOrderUpdateComponent {
  wo : WorkOrder = new WorkOrder();
  errorMessage: string | null = null;

  constructor(
    private _service: WorkOrderService, 
    private _selectDialog: MatDialog, 
    private _woCreateDialogRef: MatDialogRef<WorkOrderUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.wo = data.woToUpdate;
  }

  submit() {
    if (this.wo.client.phoneNumber == '') {
      this.errorMessage = "Seleccionar um Cliente";
    }
    else if (this.wo.motorcycle.licensePlate == '') {
      this.errorMessage = "Seleccionar uma Mota";
    }else if (!this.wo.date) {
      this.errorMessage = "Seleccionar uma Data";
    }
     else {
      this.wo.dateStart = this.wo.date;
      this._service.update(this.wo);
      this._woCreateDialogRef.close();
    }
  }

  closeDialog() {
    this._woCreateDialogRef.close();
    this._service.setActionState("refresh");
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

  delete() {
    if (window.confirm('Tem a certeza que deseja apagar este registo?')) {
      this._service.delete(this.wo);
      this._woCreateDialogRef.close();
    }
  }
}
