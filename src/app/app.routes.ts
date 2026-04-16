import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login';
import { RegistroComponent } from './paginas/registro/registro';
import { InicioComponent } from './paginas/inicio/inicio';
import { ProductosComponent } from './paginas/productos/productos'; // <-- Agregamos esta importación

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent } // <-- Agregamos esta ruta
];