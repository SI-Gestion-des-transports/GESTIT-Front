import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageConformationComponent } from './covoiturage-conformation.component';

describe('CovoiturageConformationComponent', () => {
  let component: CovoiturageConformationComponent;
  let fixture: ComponentFixture<CovoiturageConformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoiturageConformationComponent]
    });
    fixture = TestBed.createComponent(CovoiturageConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
