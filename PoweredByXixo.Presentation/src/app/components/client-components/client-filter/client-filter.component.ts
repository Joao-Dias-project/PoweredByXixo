import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client-service/client.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-client-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-filter.component.html',
  styleUrl: './client-filter.component.css'
})
export class ClientFilterComponent implements OnInit, OnDestroy{
  filterForm: FormGroup;
  private _subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private _service: ClientService) {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      taxNumber: ['']
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
