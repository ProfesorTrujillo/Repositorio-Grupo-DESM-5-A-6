import { Routes } from '@angular/router';
import { menuComponent } from './componentes/menu-component/menu-component';
import { CarritoComponent } from './componentes/carrito-component/carrito-component';
import { UbicacionComponent } from './componentes/ubicacion-component/ubicacion-component';
import { PagoExitosoComponent } from './componentes/pago-exitoso/pago-exitoso';
import { PagoCanceladoComponent } from './componentes/pago-cancelado/pago-cancelado';

export const routes: Routes = [
    {path: 'menu', component: menuComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'ubicacion', component: UbicacionComponent},
    { path: 'pago-exitoso', component: PagoExitosoComponent },
    {path: 'pago-cancelado',component: PagoCanceladoComponent},
    {path: '', redirectTo: 'menu', pathMatch: 'full'},
];
