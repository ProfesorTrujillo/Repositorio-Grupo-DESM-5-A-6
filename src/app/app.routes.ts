import { Routes } from '@angular/router';
import { PackageListComponent } from './componentes/package-list-componente/package-list-componente';
import { PackageDetailComponente } from './componentes/package-detail-componente/package-detail-componente';

export const routes: Routes = [
  { path: '', component: PackageListComponent },
  { path: 'detalles/:id', component: PackageDetailComponente },
  { path: '**', redirectTo: '' }
];
