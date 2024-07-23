import { Component, Input } from '@angular/core';
import { MotorcycleListingComponent } from '../../motorcycle-components/motorcycle-listing/motorcycle-listing.component';
import { MotorcycleService } from '../../../services/motorcycle-service/motorcycle.service';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { Motorcycle } from '../../../models/motorcycle.model';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-client-motorcycle-listing',
  standalone: true,
  imports: [MotorcycleListingComponent, CommonModule, MatDialogModule],
  templateUrl: './client-motorcycle-listing.component.html',
  styleUrl: './client-motorcycle-listing.component.css'
})
export class ClientMotorcycleListingComponent {
  @Input() client: Client = new Client();
  clientMotorcycles: Motorcycle[] = [];
  
  constructor(private _motoService: MotorcycleService) {}

  ngOnInit() {
    this._motoService.retrieveByClient(this.client).subscribe(
      data => {
        this.clientMotorcycles = data;
      },
      err => {
        console.log(err)
      },
      () => {
        console.log("Retrieved Motorcycles From Client: ", this.client.name)
      });
  }
}
