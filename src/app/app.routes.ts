import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { PagoCanceladoComponent } from './components/pago-cancelado/pago-cancelado.component'; // ← nuevo

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'pago-exitoso', component: PagoExitosoComponent },     // ← nuevo
  { path: 'pago-cancelado', component: PagoCanceladoComponent }, // ← nuevo
  { path: '**', redirectTo: '' }
];