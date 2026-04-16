import { TestBed } from '@angular/core/testing';

import { Geolocalizacion } from './geolocalizacion';

describe('Geolocalizacion', () => {
  let service: Geolocalizacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Geolocalizacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
