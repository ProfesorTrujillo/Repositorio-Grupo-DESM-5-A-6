<<<<<<< Updated upstream
import { Routes } from '@angular/router';

export const routes: Routes = [];
=======
import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login';
import { RegistroComponent } from './paginas/registro/registro';
import { InicioComponent } from './paginas/inicio/inicio';
import { ProductosComponent } from './paginas/productos/productos';
export const routes: Routes = [
{ path: 'productos', component: ProductosComponent },
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent },
{ path: 'inicio', component: InicioComponent }
];
>>>>>>> Stashed changes
