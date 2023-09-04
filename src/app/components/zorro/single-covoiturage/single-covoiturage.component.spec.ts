import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCovoiturageComponent } from './single-covoiturage.component';

describe('SingleCovoiturageComponent', () => {
  let component: SingleCovoiturageComponent;
  let fixture: ComponentFixture<SingleCovoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCovoiturageComponent]
    });
    fixture = TestBed.createComponent(SingleCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
