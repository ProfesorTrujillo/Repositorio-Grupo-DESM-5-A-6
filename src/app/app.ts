import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { PackageListComponent } from './components/package-list/package-list';
import { PackageDetailComponent } from './components/package-detail/package-detail';
import { TravelPackage } from './services/package.spec';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, PackageListComponent, PackageDetailComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  currentPackage?: TravelPackage;

  onPackageSelected(pkg: TravelPackage) {
    this.currentPackage = pkg;
  }
}