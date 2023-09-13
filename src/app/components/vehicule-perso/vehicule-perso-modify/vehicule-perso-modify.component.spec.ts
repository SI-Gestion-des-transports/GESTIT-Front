import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculePersoModifyComponent } from './vehicule-perso-modify.component';

describe('VehiculePersoModifyComponent', () => {
  let component: VehiculePersoModifyComponent;
  let fixture: ComponentFixture<VehiculePersoModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculePersoModifyComponent]
    });
    fixture = TestBed.createComponent(VehiculePersoModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
