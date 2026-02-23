import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
  { path: '',        component: MenuComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**',      redirectTo: '' }
];