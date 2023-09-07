import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesOrganiseFormComponent } from './covoiturages-organise-form.component';

describe('CovoituragesOrganiseFormComponent', () => {
  let component: CovoituragesOrganiseFormComponent;
  let fixture: ComponentFixture<CovoituragesOrganiseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesOrganiseFormComponent]
    });
    fixture = TestBed.createComponent(CovoituragesOrganiseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
