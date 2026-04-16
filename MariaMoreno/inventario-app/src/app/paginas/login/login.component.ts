import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  correo: string = '';
  password: string = '';

  cargando: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) {}

  async iniciar() {
  this.mensajeError = '';
  this.mensajeExito = '';
  this.cargando = true;

  try {
    await this.auth.iniciarSesion(this.correo, this.password);
    this.mensajeExito = "Inicio de sesión exitoso";

    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 800);

  } catch (error: any) {

    if (error.code === 'auth/invalid-credential') {
      this.mensajeError = "Correo o contraseña incorrectos.";
    } else {
      this.mensajeError = "Error al iniciar sesión.";
    }
    this.cd.detectChanges();

  } finally {
    this.cargando = false;
  }
}
  ngOnInit() {
  this.correo = '';
  this.password = '';
}
}