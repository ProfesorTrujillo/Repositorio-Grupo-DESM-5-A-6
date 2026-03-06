import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
import { Carrito } from './components/carrito/carrito';
import { UbicacionComponent } from './components/ubicacion/ubicacion';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'carrito', component: Carrito },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: '**', redirectTo: '' }
];
