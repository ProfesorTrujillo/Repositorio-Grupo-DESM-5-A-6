import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth';
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
    
    console.log("Intentando iniciar sesión con:", this.correo);
    
    try {
      await this.auth.iniciarSesion(this.correo, this.password);
      console.log("¡Autenticación en Firebase exitosa!");
      
      await this.router.navigate(['/inicio']);
    } catch (error: any) {
      console.error("Error detectado en el Login:", error);
      if (error.code === 'auth/invalid-credential') {
        this.mensajeError = "Correo o contraseña incorrectos. Verifica tus datos.";
      } else {
        this.mensajeError = "Error: " + error.message;
      }
    } finally {
      // El bloque finally asegura que siempre dejemos de cargar, 
      // haya ocurrido un error o no.
      this.cargando = false;
    }
  }
}