import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleCreateComponent } from './motorcycle-create.component';

describe('MotorcycleCreateComponent', () => {
  let component: MotorcycleCreateComponent;
  let fixture: ComponentFixture<MotorcycleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorcycleCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorcycleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
