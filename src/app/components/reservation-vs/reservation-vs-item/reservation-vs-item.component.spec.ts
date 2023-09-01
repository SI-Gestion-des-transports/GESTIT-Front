import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationVsItemComponent } from './reservation-vs-item.component';

describe('ReservationVsItemComponent', () => {
  let component: ReservationVsItemComponent;
  let fixture: ComponentFixture<ReservationVsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationVsItemComponent]
    });
    fixture = TestBed.createComponent(ReservationVsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
