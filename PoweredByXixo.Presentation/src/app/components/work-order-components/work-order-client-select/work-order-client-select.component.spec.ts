import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderClientSelectComponent } from './work-order-client-select.component';

describe('WorkOrderClientFilterComponent', () => {
  let component: WorkOrderClientSelectComponent;
  let fixture: ComponentFixture<WorkOrderClientSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrderClientSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkOrderClientSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
