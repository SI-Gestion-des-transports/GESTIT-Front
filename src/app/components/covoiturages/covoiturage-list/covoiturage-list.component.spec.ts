import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageListComponent } from './covoiturage-list.component';

describe('CovoiturageListComponent', () => {
  let component: CovoiturageListComponent;
  let fixture: ComponentFixture<CovoiturageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoiturageListComponent]
    });
    fixture = TestBed.createComponent(CovoiturageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
