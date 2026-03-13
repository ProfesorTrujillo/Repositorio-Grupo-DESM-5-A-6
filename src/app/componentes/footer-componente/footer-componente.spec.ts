import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponente } from './footer-componente';

describe('FooterComponente', () => {
  let component: FooterComponente;
  let fixture: ComponentFixture<FooterComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
