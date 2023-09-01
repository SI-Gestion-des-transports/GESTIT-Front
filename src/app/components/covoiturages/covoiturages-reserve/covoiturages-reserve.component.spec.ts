import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesReserveComponent } from './covoiturages-reserve.component';

describe('CovoituragesReserveComponent', () => {
  let component: CovoituragesReserveComponent;
  let fixture: ComponentFixture<CovoituragesReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesReserveComponent]
    });
    fixture = TestBed.createComponent(CovoituragesReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
