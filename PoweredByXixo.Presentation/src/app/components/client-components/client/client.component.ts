import { Component } from '@angular/core';
import { ClientListingComponent } from '../client-listing/client-listing.component';
import { ClientFilterComponent } from '../client-filter/client-filter.component';
import { ClientCreateComponent } from "../client-create/client-create.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ClientListingComponent, ClientFilterComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  hideCreateButton : boolean = false;
  
  constructor(private _dialog: MatDialog) { }

  showCreate(){
    this._dialog.open(ClientCreateComponent, { position: { top: '85px' }});
  }
}
