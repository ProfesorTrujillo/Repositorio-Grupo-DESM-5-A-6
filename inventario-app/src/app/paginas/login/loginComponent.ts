import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../servicios/authService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async iniciar() {
    this.mensajeError = "PRUEBA VISUAL";
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
      console.log("ERROR LOGIN:", error);

      this.mensajeError = "Las credenciales no coinciden.";
      this.cargando = false;

      this.cdr.detectChanges(); // 🔥 fuerza actualización
    }
  }

  limpiarMensajes() {
    this.mensajeError = '';
    this.mensajeExito = '';
  }
}