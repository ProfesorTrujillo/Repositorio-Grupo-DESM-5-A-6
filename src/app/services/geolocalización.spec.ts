import { TestBed } from '@angular/core/testing';

import { Geolocalización } from './geolocalización';

describe('Geolocalización', () => {
  let service: Geolocalización;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Geolocalización);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
