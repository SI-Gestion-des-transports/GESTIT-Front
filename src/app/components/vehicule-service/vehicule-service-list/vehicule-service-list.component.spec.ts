import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeServiceListComponent } from './vehicule-service-list.component';

describe('VehiculeServiceListComponent', () => {
  let component: VehiculeServiceListComponent;
  let fixture: ComponentFixture<VehiculeServiceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeServiceListComponent]
    });
    fixture = TestBed.createComponent(VehiculeServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
