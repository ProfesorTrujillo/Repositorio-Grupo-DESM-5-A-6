import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageListComponent } from './package-list';

describe('PackageListComponent', () => {
  let component: PackageListComponent;
  let fixture: ComponentFixture<PackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
