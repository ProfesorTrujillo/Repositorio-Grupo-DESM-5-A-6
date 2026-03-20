import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailComponente } from './package-detail-componente';

describe('PackageDetailComponente', () => {
  let component: PackageDetailComponente;
  let fixture: ComponentFixture<PackageDetailComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageDetailComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageDetailComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
