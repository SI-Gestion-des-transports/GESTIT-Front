import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesOrganiseComponent } from './covoiturages-organise.component';

describe('CovoituragesOrganiseComponent', () => {
  let component: CovoituragesOrganiseComponent;
  let fixture: ComponentFixture<CovoituragesOrganiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesOrganiseComponent]
    });
    fixture = TestBed.createComponent(CovoituragesOrganiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
