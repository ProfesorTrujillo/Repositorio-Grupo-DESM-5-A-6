import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
import { Carrito } from './components/carrito/carrito';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'carrito', component: Carrito },
  { path: '**', redirectTo: '' }
];
