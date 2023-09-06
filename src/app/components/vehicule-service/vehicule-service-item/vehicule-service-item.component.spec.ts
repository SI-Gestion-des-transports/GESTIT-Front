import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeServiceItemComponent } from './vehicule-service-item.component';

describe('VehiculeServiceItemComponent', () => {
  let component: VehiculeServiceItemComponent;
  let fixture: ComponentFixture<VehiculeServiceItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeServiceItemComponent]
    });
    fixture = TestBed.createComponent(VehiculeServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
