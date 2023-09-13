import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesOrganiseModifyComponent } from './covoiturages-organise-modify.component';

describe('CovoituragesOrganiseModifyComponent', () => {
  let component: CovoituragesOrganiseModifyComponent;
  let fixture: ComponentFixture<CovoituragesOrganiseModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesOrganiseModifyComponent]
    });
    fixture = TestBed.createComponent(CovoituragesOrganiseModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
