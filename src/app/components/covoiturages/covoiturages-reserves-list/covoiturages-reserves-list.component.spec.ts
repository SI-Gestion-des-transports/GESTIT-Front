import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesReservesListComponent } from './covoiturages-reserves-list.component';

describe('CovoituragesReservesListComponent', () => {
  let component: CovoituragesReservesListComponent;
  let fixture: ComponentFixture<CovoituragesReservesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesReservesListComponent]
    });
    fixture = TestBed.createComponent(CovoituragesReservesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
