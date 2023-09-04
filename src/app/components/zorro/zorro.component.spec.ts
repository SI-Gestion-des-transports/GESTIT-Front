import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZorroComponent } from './zorro.component';

describe('ZorroComponent', () => {
  let component: ZorroComponent;
  let fixture: ComponentFixture<ZorroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZorroComponent]
    });
    fixture = TestBed.createComponent(ZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
