import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleListingComponent } from './motorcycle-listing.component';

describe('MotorcycleListingComponent', () => {
  let component: MotorcycleListingComponent;
  let fixture: ComponentFixture<MotorcycleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorcycleListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorcycleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
