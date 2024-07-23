import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleWorkOrderListingComponent } from './motorcycle-work-order-listing.component';

describe('MotorcycleWorkOrderListingComponent', () => {
  let component: MotorcycleWorkOrderListingComponent;
  let fixture: ComponentFixture<MotorcycleWorkOrderListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorcycleWorkOrderListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorcycleWorkOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
