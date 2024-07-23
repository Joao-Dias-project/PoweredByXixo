import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MotorcycleService } from '../../../services/motorcycle-service/motorcycle.service';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-motorcycle-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './motorcycle-filter.component.html',
  styleUrls: ['./motorcycle-filter.component.css']
})

export class MotorcycleFilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  private _subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private _service: MotorcycleService) {
    this.filterForm = this.fb.group({
      make: [''],
      model: [''],
      licensePlate: [''],
      vin: ['']
    });
  }

  ngOnInit() {
    this._subscription.add(
      this.filterForm.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(() => {
        this._service.setHasFitler(true);
        this._service.setFilter(this.filterForm.value);
        this._service.setActionState("refresh");
      })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  clearForm() {
    this.filterForm.reset();
    this._service.setHasFitler(false);
  }
  
}