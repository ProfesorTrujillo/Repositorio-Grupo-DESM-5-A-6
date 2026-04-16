import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {

  correo: string = '';
  password: string = '';

  cargando: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async registrar() {
    this.mensajeError = '';
    this.mensajeExito = '';
    this.cargando = true;

    try {
    await this.auth.registrarUsuario(this.correo, this.password);
    
    this.mensajeExito = "Usuario registrado correctamente";

    this.correo = '';
    this.password = '';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);

  } catch (error: any) {

  if (error.code === 'auth/email-already-in-use') {
    this.mensajeError = "Este correo ya está registrado.";
  } else if (error.code === 'auth/invalid-email') {
    this.mensajeError = "Correo inválido.";
  } else if (error.code === 'auth/weak-password') {
    this.mensajeError = "La contraseña debe tener al menos 6 caracteres.";
  } else {
    this.mensajeError = "Error al registrar usuario.";
  }

}}}