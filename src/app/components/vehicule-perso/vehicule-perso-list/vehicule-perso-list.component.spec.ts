import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculePersoListComponent } from './vehicule-perso-list.component';

describe('VehiculePersoListComponent', () => {
  let component: VehiculePersoListComponent;
  let fixture: ComponentFixture<VehiculePersoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculePersoListComponent]
    });
    fixture = TestBed.createComponent(VehiculePersoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
