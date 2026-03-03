import { Routes } from '@angular/router';
import { MenuComponent } from './menu-component/menu-component';
import { CarritoComponent } from './carrito-component/carrito-component';
import { UbicacionComponent } from './ubicacion-component/ubicacion-component';

export const routes: Routes = [
    { path: '', component: MenuComponent, pathMatch: 'full' },
    { path: 'carrito', component: CarritoComponent },
    { path: 'ubicacion', component: UbicacionComponent }
];
    