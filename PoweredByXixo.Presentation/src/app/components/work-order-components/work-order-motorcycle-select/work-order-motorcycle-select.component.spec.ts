import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderMotorcycleSelectComponent } from './work-order-motorcycle-select.component';

describe('WorkOrderMotorcycleSelectComponent', () => {
  let component: WorkOrderMotorcycleSelectComponent;
  let fixture: ComponentFixture<WorkOrderMotorcycleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrderMotorcycleSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkOrderMotorcycleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
