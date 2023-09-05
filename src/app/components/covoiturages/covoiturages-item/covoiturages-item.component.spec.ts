import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoituragesItemComponent } from './covoiturages-item.component';

describe('CovoituragesItemComponent', () => {
  let component: CovoituragesItemComponent;
  let fixture: ComponentFixture<CovoituragesItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CovoituragesItemComponent]
    });
    fixture = TestBed.createComponent(CovoituragesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
