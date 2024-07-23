import { Routes } from '@angular/router';
import { MotorcycleComponent } from './components/motorcycle-components/motorcycle/motorcycle.component';
import { ClientComponent } from './components/client-components/client/client.component';
import { WorkOrderComponent } from './components/work-order-components/work-order/work-order.component';

export const routes: Routes = [
    { path: 'motorcycles', component: MotorcycleComponent },
    { path: 'clients', component: ClientComponent },
    { path: 'workOrders', component: WorkOrderComponent }
];

