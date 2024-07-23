import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MotorcycleService } from '../../../services/motorcycle-service/motorcycle.service';
import { Motorcycle } from '../../../models/motorcycle.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule  } from '@angular/material/dialog';
import { MotorcycleUpdateComponent } from '../motorcycle-update/motorcycle-update.component';


@Component({
    selector: 'app-motorcycle-listing',
    standalone: true,
    imports: [CommonModule, MatDialogModule],
    templateUrl: './motorcycle-listing.component.html',
    styleUrl: './motorcycle-listing.component.css'
})
export class MotorcycleListingComponent {
    private _subscription!: Subscription;
    motorcycles: Motorcycle[] = [];
    @Input() selecting: boolean = false;
    @Output() clientSelected: EventEmitter<Motorcycle> = new EventEmitter<Motorcycle>();

    constructor(private _service: MotorcycleService, private _motorcycleUpdateDialog: MatDialog) {}

    ngOnInit() {
        this._subscription = this._service.getActionState().subscribe(state => {
            if (this._service.getHasFitler()) {
                this._service.retrieveByFilter().subscribe(
                    data => {
                        this.motorcycles = data;
                    },
                    err => {
                        console.log(err)
                    },
                    () => {
                        console.log("Retrieved filtered motorcycles")
                    });
            } else {
                this._service.retrieveAll().subscribe(
                    data => {
                        this.motorcycles = data;
                    },
                    err => {
                        console.log(err)
                    },
                    () => {
                        console.log("Retrieved all motorcycles")
                    });
            }
        })

    }

    select(moto: Motorcycle) {
        if (this.selecting) {
            this.clientSelected.emit(moto);
        } else {
            this._motorcycleUpdateDialog.open(MotorcycleUpdateComponent, { position: { top: '85px' }, data: { motoToUpdate: moto } });
        }
    }
}
