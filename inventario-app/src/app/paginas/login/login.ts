import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  cargando: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  async iniciar() {
    // ── Validaciones ──
    if (!this.correo.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor ingresa tu correo electrónico.',
        background: '#1a1b2e',
        color: '#ffffff',
        confirmButtonColor: '#00d2ff'
      });
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
    if (!emailValido) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Ingresa un correo electrónico válido.',
        background: '#1a1b2e',
        color: '#ffffff',
        confirmButtonColor: '#00d2ff'
      });
      return;
    }

    if (!this.password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'Por favor ingresa tu contraseña.',
        background: '#1a1b2e',
        color: '#ffffff',
        confirmButtonColor: '#00d2ff'
      });
      return;
    }

    if (this.password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        background: '#1a1b2e',
        color: '#ffffff',
        confirmButtonColor: '#00d2ff'
      });
      return;
    }

    // ── Login ──
    this.cargando = true;
    try {
      await this.auth.iniciarSesion(this.correo, this.password);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: '#1a1b2e',
        color: '#ffffff'
      });

      setTimeout(() => this.router.navigate(['/inicio']), 1500);

    } catch (error: any) {
      // Mensajes según el código de error de Firebase
      let mensaje = 'Credenciales incorrectas.';
      if (error.code === 'auth/user-not-found') mensaje = 'No existe una cuenta con ese correo.';
      if (error.code === 'auth/wrong-password') mensaje = 'Contraseña incorrecta.';
      if (error.code === 'auth/too-many-requests') mensaje = 'Demasiados intentos. Intenta más tarde.';
      if (error.code === 'auth/invalid-email') mensaje = 'El formato del correo no es válido.';

      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: mensaje,
        background: '#1a1b2e',
        color: '#ffffff',
        confirmButtonColor: '#cf6679'
      });
    }

    this.cargando = false;
  }
}