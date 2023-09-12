import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesOrganiseListComponent } from './covoiturages-organise-list.component';

describe('CovoituragesOrganiseListComponent', () => {
  let component: CovoituragesOrganiseListComponent;
  let fixture: ComponentFixture<CovoituragesOrganiseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesOrganiseListComponent]
    });
    fixture = TestBed.createComponent(CovoituragesOrganiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
