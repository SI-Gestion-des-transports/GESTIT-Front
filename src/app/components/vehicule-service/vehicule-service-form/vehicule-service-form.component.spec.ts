import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeServiceFormComponent } from './vehicule-service-form.component';

describe('VehiculeServiceFormComponent', () => {
  let component: VehiculeServiceFormComponent;
  let fixture: ComponentFixture<VehiculeServiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeServiceFormComponent]
    });
    fixture = TestBed.createComponent(VehiculeServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
