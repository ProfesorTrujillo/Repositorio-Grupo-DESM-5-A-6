import { TestBed } from '@angular/core/testing';
import { Platillos } from './menu-service';

describe('Platillos', () => {
  let service: Platillos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Platillos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
