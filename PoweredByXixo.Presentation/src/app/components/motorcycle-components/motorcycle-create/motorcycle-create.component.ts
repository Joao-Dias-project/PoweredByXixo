import { Component } from '@angular/core';
import { Motorcycle } from '../../../models/motorcycle.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MotorcycleService } from '../../../services/motorcycle-service/motorcycle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-motorcycle-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './motorcycle-create.component.html',
  styleUrl: './motorcycle-create.component.css'
})
export class MotorcycleCreateComponent {
  moto:Motorcycle = new Motorcycle();
  errorMessage: string | null = null;

  constructor(private _service: MotorcycleService, private _motorcycleCreateDialogRef: MatDialogRef<MotorcycleCreateComponent>){}

  submit() {
    if (this.moto.licensePlate == '') {
      this.errorMessage = "Inserir matrícula antes de adiconar mota";
    } else {
      this._service.create(this.moto);
    }
  }

  closeDialog(){
    this._motorcycleCreateDialogRef.close();
  }

  onBlur() {
    if (this.moto.licensePlate == '') {
      this.errorMessage = "Matrícula é obrigatório";
    } else {
      this.errorMessage = null;
    }
  }
}
