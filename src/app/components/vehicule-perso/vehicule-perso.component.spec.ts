import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculePersoComponent } from './vehicule-perso.component';

describe('VehiculePersoComponent', () => {
  let component: VehiculePersoComponent;
  let fixture: ComponentFixture<VehiculePersoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculePersoComponent]
    });
    fixture = TestBed.createComponent(VehiculePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
