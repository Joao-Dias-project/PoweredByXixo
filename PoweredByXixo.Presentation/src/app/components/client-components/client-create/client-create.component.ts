import { Component } from '@angular/core';
import { Client } from '../../../models/client.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client-service/client.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent {
  client:Client = new Client();
  errorMessage: string | null = null;

  constructor(private _service: ClientService, private _clientCreateDialogRef: MatDialogRef<ClientCreateComponent>){}

  submit() {
    if (this.client.phoneNumber == '') {
      this.errorMessage = "Inserir telefone antes de adiconar cliente";
    } else {
      this._service.create(this.client);
      this._clientCreateDialogRef.close();
    }
  }

  closeDialog(){
    this._clientCreateDialogRef.close();
  }

  onBlur() {
    if (this.client.phoneNumber == '') {
      this.errorMessage = "Telefone é obrigatório";
    } else {
      this.errorMessage = null;
    }
  }
}
