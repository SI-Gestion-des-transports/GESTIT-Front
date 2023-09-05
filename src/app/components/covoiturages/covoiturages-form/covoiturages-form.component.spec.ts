import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesFormComponent } from './covoiturages-form.component';

describe('CovoituragesFormComponent', () => {
  let component: CovoituragesFormComponent;
  let fixture: ComponentFixture<CovoituragesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesFormComponent]
    });
    fixture = TestBed.createComponent(CovoituragesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
