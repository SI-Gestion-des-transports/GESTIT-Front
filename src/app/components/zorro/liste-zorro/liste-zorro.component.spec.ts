import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeZorroComponent } from './liste-zorro.component';

describe('ListeZorroComponent', () => {
  let component: ListeZorroComponent;
  let fixture: ComponentFixture<ListeZorroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeZorroComponent]
    });
    fixture = TestBed.createComponent(ListeZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
