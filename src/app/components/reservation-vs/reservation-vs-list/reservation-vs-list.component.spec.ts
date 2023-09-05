import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationVsListComponent } from './reservation-vs-list.component';

describe('ReservationVsListComponent', () => {
  let component: ReservationVsListComponent;
  let fixture: ComponentFixture<ReservationVsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationVsListComponent]
    });
    fixture = TestBed.createComponent(ReservationVsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
