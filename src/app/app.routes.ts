import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CarritoComponent } from './carrito/carrito.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';

import { PagoExitosoComponent } from './pago-exitoso/pago-exitoso.component';
import { PagoCanceladoComponent } from './pago-cancelado/pago-cancelado.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'pago-exitoso', component: PagoExitosoComponent },
  { path: 'pago-cancelado', component: PagoCanceladoComponent },
  { path: '**', redirectTo: '' }
];