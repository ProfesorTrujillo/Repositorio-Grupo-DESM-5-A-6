import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponente } from './app-componente';

describe('AppComponente', () => {
  let component: AppComponente;
  let fixture: ComponentFixture<AppComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
