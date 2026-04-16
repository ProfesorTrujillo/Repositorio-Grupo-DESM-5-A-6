import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menuComponent';
import { CarritoComponent } from './components/carrito/carritoComponent';
import { UbicacionComponent } from './components/ubicacion/ubicacion';

export const routes: Routes = [
{ path: '', component: MenuComponent },
{ path: 'carrito', component: CarritoComponent },
{ path: 'ubicacion', component: UbicacionComponent },
{ path: '**', redirectTo: '' }
];