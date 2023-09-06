import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeServiceAddComponent } from './vehicule-service-add.component';

describe('VehiculeServiceAddComponent', () => {
  let component: VehiculeServiceAddComponent;
  let fixture: ComponentFixture<VehiculeServiceAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeServiceAddComponent]
    });
    fixture = TestBed.createComponent(VehiculeServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
