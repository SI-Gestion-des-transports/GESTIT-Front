import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesListComponent } from './covoiturages-list.component';

describe('CovoituragesListComponent', () => {
  let component: CovoituragesListComponent;
  let fixture: ComponentFixture<CovoituragesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesListComponent]
    });
    fixture = TestBed.createComponent(CovoituragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
