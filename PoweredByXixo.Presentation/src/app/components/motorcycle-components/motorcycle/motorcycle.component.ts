import { Component} from '@angular/core';
import { MotorcycleListingComponent } from '../motorcycle-listing/motorcycle-listing.component';
import { MotorcycleFilterComponent } from '../motorcycle-filter/motorcycle-filter.component';
import { MotorcycleService } from '../../../services/motorcycle-service/motorcycle.service';
import { MatDialog } from '@angular/material/dialog';
import { MotorcycleCreateComponent } from '../motorcycle-create/motorcycle-create.component';

@Component({
  selector: 'app-motorcycle',
  standalone: true,
  imports: [MotorcycleListingComponent, MotorcycleFilterComponent],
  templateUrl: './motorcycle.component.html',
  styleUrl: './motorcycle.component.css'
})
export class MotorcycleComponent {
  hideCreateButton : boolean = false;
  
  constructor(private _service: MotorcycleService, private _dialog: MatDialog) { }

  showCreate(){
    this._dialog.open(MotorcycleCreateComponent, { position: { top: '85px' }});
  }
}

