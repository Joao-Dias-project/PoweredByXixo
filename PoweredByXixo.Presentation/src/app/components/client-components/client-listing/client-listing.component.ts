import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientService } from '../../../services/client-service/client.service';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientUpdateComponent } from '../client-update/client-update.component';

@Component({
  selector: 'app-client-listing',
  standalone: true,
  imports: [CommonModule, ClientUpdateComponent, MatDialogModule],
  templateUrl: './client-listing.component.html',
  styleUrl: './client-listing.component.css'
})
export class ClientListingComponent {
  clients: Client[] = [];
  private _subscription!: Subscription;
  @Input() selecting : boolean = false;
  @Output() clientSelected: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private _service: ClientService, private _updateClientDialog: MatDialog) { }

    ngOnInit() {
        this._subscription = this._service.getActionState().subscribe(state => {
            if (this._service.getHasFitler()) {
                this._service.retrieveByFilter().subscribe(
                    data => {
                        this.clients = data;
                    },
                    err => {
                        console.log(err)
                    },
                    () => {
                        console.log("Retrieved filtered clients")
                    });
            } else {
                this._service.retrieveAll().subscribe(
                    data => {
                        this.clients = data;
                    },
                    err => {
                        console.log(err)
                    },
                    () => {
                        console.log("Retrieved all clients")
                    });
            }
        });
    }

    select(client: Client) {
        if (this.selecting) {
            this.clientSelected.emit(client);
        } else {
            this._updateClientDialog.open(ClientUpdateComponent, { position: { top: '85px' }, data: { clientToUpdate: client } });
        }
    }
}
