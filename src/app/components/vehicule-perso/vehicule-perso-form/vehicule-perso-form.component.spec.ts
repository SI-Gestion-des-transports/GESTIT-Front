import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculePersoFormComponent } from './vehicule-perso-form.component';

describe('VehiculePersoFormComponent', () => {
  let component: VehiculePersoFormComponent;
  let fixture: ComponentFixture<VehiculePersoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculePersoFormComponent]
    });
    fixture = TestBed.createComponent(VehiculePersoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
