import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationVsFormComponent } from './reservation-vs-form.component';

describe('ReservationVsFormComponent', () => {
  let component: ReservationVsFormComponent;
  let fixture: ComponentFixture<ReservationVsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationVsFormComponent]
    });
    fixture = TestBed.createComponent(ReservationVsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
