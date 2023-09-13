import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculePersoAddComponent } from './vehicule-perso-add.component';

describe('VehiculePersoAddComponent', () => {
  let component: VehiculePersoAddComponent;
  let fixture: ComponentFixture<VehiculePersoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculePersoAddComponent]
    });
    fixture = TestBed.createComponent(VehiculePersoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
