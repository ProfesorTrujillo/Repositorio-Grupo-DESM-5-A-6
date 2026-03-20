import { ComponentFixture, TestBed } from '@angular/core/testing';
// Update the import to match the actual exported class name from './package-list-componente'
import { PackageListComponent } from './package-list-componente';

describe('PackageListComponent', () => {
  let component: PackageListComponent;
  let fixture: ComponentFixture<PackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
