import { Routes } from '@angular/router';
import { LoginComponent } from './app/paginas/login/login';
import { RegistroComponent } from './app/paginas/registro/registro';
import { InicioComponent } from './app/paginas/inicio/inicio';
import { ProductosComponent } from './app/paginas/productos/productos.component';

export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'productos', component: ProductosComponent}
];
