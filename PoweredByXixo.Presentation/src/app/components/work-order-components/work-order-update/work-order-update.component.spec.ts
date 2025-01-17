import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderUpdateComponent } from './work-order-update.component';

describe('WorkOrderUpdateComponent', () => {
  let component: WorkOrderUpdateComponent;
  let fixture: ComponentFixture<WorkOrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrderUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
