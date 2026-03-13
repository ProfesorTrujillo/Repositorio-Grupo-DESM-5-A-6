import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailComponent } from './package-detail';

describe('PackageDetailComponent', () => {
  let component: PackageDetailComponent;
  let fixture: ComponentFixture<PackageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
