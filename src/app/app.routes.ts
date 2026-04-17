import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
import { Carrito } from './components/carrito/carrito';
import { UbicacionComponent } from './components/ubicacion/ubicacion';
import { PagoExitoso } from './components/pago-exitoso/pago-exitoso';
import { PagoCancelado } from './components/pago-cancelado/pago-cancelado';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'carrito', component: Carrito },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: '**', redirectTo: '' },
  { path: 'pago-exitoso', component: PagoExitoso },
  { path: 'pago-cancelado', component: PagoCancelado }
];
