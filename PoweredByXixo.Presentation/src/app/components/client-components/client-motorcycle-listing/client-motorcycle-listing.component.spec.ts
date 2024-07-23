import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMotorcycleListingComponent } from './client-motorcycle-listing.component';

describe('ClientMotorcycleListingComponent', () => {
  let component: ClientMotorcycleListingComponent;
  let fixture: ComponentFixture<ClientMotorcycleListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMotorcycleListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientMotorcycleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
