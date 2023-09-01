import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesVehiculePersoComponent } from './covoiturages-vehicule-perso.component';

describe('CovoituragesVehiculePersoComponent', () => {
  let component: CovoituragesVehiculePersoComponent;
  let fixture: ComponentFixture<CovoituragesVehiculePersoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesVehiculePersoComponent]
    });
    fixture = TestBed.createComponent(CovoituragesVehiculePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
