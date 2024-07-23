import { Component} from '@angular/core';
import { WorkOrderListingComponent } from '../work-order-listing/work-order-listing.component'
import { WorkOrderFilterComponent } from '../work-order-filter/work-order-filter.component';
import { WorkOrderCreateComponent } from '../work-order-create/work-order-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-work-order',
  standalone: true,
  imports: [WorkOrderListingComponent, WorkOrderFilterComponent,WorkOrderCreateComponent],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.css'
})
export class WorkOrderComponent {
  hideCreateButton : boolean = false;
  
  constructor(private _dialog: MatDialog) { }

  showCreate(){
    this._dialog.open(WorkOrderCreateComponent, { position: { top: '85px' }});
  }
}
