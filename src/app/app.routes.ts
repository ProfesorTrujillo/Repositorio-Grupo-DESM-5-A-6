import { Routes } from '@angular/router';
import { MenuComponent } from './menu-component/menu-component';
import { CarritoComponent } from './carrito-component/carrito-component';

export const routes: Routes = [
    { path: '', component: MenuComponent, pathMatch: 'full' },
    { path: 'carrito', component: CarritoComponent }
];
