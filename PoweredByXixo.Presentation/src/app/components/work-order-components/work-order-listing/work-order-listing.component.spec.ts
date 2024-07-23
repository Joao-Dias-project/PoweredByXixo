import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderListingComponent } from './work-order-listing.component';

describe('WorkOrderListingComponent', () => {
  let component: WorkOrderListingComponent;
  let fixture: ComponentFixture<WorkOrderListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrderListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
