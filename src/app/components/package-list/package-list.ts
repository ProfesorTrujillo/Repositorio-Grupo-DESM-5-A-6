import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PackageService, TravelPackage } from '../../services/package.spec';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './package-list.html',
  styleUrls: ['./package-list.css']
})
export class PackageListComponent implements OnInit {
  packages: TravelPackage[] = [];
  @Output() packageSelected = new EventEmitter<TravelPackage>();

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.packages = this.packageService.getPackages();
  }

  selectPackage(pkg: TravelPackage): void {
    this.packageSelected.emit(pkg);
  }
}