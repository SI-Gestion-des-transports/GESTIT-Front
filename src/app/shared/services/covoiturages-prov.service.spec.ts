import { TestBed } from '@angular/core/testing';

import { CovoituragesProvService } from './covoiturages-prov.service';

describe('CovoituragesProvService', () => {
  let service: CovoituragesProvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovoituragesProvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
