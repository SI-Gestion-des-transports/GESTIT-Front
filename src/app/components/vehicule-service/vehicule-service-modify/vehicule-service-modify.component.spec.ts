import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeServiceModifyComponent } from './vehicule-service-modify.component';

describe('VehiculeServiceModifyComponent', () => {
  let component: VehiculeServiceModifyComponent;
  let fixture: ComponentFixture<VehiculeServiceModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeServiceModifyComponent]
    });
    fixture = TestBed.createComponent(VehiculeServiceModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
