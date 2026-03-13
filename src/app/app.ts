import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponente } from './componentes/header-componente/header-componente';
import { FooterComponente } from './componentes/footer-componente/footer-componente';
import { PackageListComponent } from './componentes/package-list-componente/package-list-componente';
import { PackageDetailComponente } from './componentes/package-detail-componente/package-detail-componente';
import { AppComponente } from "./componentes/app-componente/app-componente";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponente,RouterOutlet, FooterComponente, PackageListComponent, PackageDetailComponente, AppComponente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
