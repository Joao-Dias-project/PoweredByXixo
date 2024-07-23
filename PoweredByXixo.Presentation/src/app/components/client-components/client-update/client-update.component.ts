import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../../../services/client-service/client.service';
import { Client } from '../../../models/client.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientMotorcycleListingComponent } from '../../client-components/client-motorcycle-listing/client-motorcycle-listing.component';


@Component({
  selector: 'app-client-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ClientMotorcycleListingComponent, MatDialogModule],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent {
  client : Client;
  errorMessage: string | null = null;
  
  constructor(
    private _clientService: ClientService,
    private _clientUpdateDialogRef: MatDialogRef<ClientUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){this.client = data.clientToUpdate;}

  ngOnInit() {
  }

  submit() {
    if (this.client.phoneNumber == '') {
      this.errorMessage = "Inserir telefone antes de submeter alterações";
    } else {
      this._clientService.update(this.client);
    }
  }

  onBlur() {
    if (this.client.phoneNumber == '') {
      this.errorMessage = "Telefone é obrigatório";
    } else {
      this.errorMessage = null;
    }
  }

  delete() {
    if (window.confirm('Tem a certeza que deseja apagar este registo?')) {
      this._clientService.delete(this.client);
      this._clientUpdateDialogRef.close();
    }
  }

  closeDialog() {
    this._clientUpdateDialogRef.close();
    this._clientService.setActionState("refresh");
  }
}
