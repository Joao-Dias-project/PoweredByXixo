import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MotorcycleService } from '../../../services/motorcycle-service/motorcycle.service';
import { Motorcycle } from '../../../models/motorcycle.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MotorcycleWorkOrderListingComponent } from '../motorcycle-work-order-listing/motorcycle-work-order-listing.component';


@Component({
  selector: 'app-motorcycle-update',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MotorcycleWorkOrderListingComponent],
  templateUrl: './motorcycle-update.component.html',
  styleUrl: './motorcycle-update.component.css'
})
export class MotorcycleUpdateComponent {
  moto : Motorcycle;
  errorMessage: string | null = null;

  constructor(
    private _service: MotorcycleService, 
    private motoUpdateDialogRef: MatDialogRef<MotorcycleUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){this.moto = data.motoToUpdate;}

  submit() {
    if (this.moto.licensePlate == '') {
      this.errorMessage = "Inserir matrícula antes de submeter alterações";
    } else {
      this._service.update(this.moto);
    }
  }

  onBlur() {
    if (this.moto.licensePlate == '') {
      this.errorMessage = "Matrícula é obrigatório";
    } else {
      this.errorMessage = null;
    }
  }

  delete() {
    if (window.confirm('Tem a certeza que deseja apagar este registo?')) {
      this._service.delete(this.moto);
      this.motoUpdateDialogRef.close();
    }
  }

  closeDialog(){
    this.motoUpdateDialogRef.close();
    this._service.setActionState("refresh");
  }
}
