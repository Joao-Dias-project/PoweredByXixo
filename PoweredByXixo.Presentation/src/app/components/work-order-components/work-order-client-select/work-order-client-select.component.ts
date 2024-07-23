import { Component } from '@angular/core';
import { ClientFilterComponent } from '../../client-components/client-filter/client-filter.component';
import { ClientListingComponent } from '../../client-components/client-listing/client-listing.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-work-order-client-filter',
  standalone: true,
  imports: [ClientFilterComponent, ClientListingComponent],
  templateUrl: './work-order-client-select.component.html',
  styleUrl: './work-order-client-select.component.css'
})
export class WorkOrderClientSelectComponent {

  constructor(private _clientSelectDialogRef: MatDialogRef<WorkOrderClientSelectComponent>) { }

  ngOnInit() {
  }

  onClientSelected(client: Client) {
    this._clientSelectDialogRef.close(client);
  }

  closeDialog(){
    this._clientSelectDialogRef.close();
  }
}
