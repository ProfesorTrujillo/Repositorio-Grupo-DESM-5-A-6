import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/loginComponent';
import { RegistroComponent } from './paginas/registro/registroComponent';
import { InicioComponent } from './paginas/inicio/inicioComponent';
import { ProductosComponent } from './paginas/productos/productosComponent';
export const routes: Routes = [

{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'productos', component: ProductosComponent },
];