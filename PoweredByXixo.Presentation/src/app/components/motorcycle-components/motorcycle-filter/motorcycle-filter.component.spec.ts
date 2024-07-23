import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleFilterComponent } from './motorcycle-filter.component';

describe('MotorcycleFilterComponent', () => {
  let component: MotorcycleFilterComponent;
  let fixture: ComponentFixture<MotorcycleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorcycleFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorcycleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
