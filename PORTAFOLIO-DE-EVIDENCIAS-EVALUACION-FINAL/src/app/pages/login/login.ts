import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
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

  constructor(private auth: AuthService, private router: Router) {}

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
      this.mensajeError = "Credenciales incorrectas.";
    }

    this.cargando = false;
  }
}