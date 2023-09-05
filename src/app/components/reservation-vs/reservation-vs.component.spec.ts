import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationVsComponent } from './reservation-vs.component';

describe('ReservationVsComponent', () => {
  let component: ReservationVsComponent;
  let fixture: ComponentFixture<ReservationVsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationVsComponent]
    });
    fixture = TestBed.createComponent(ReservationVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
