import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
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

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

    } catch (error: any) {
      this.mensajeError = "Error: " + error.message;
    }

    this.cargando = false;
  }
}