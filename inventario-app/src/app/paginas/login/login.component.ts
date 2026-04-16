// src/app/paginas/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = "";
  password: string = "";
  cargando: boolean = false;
  mensajeError: string = "";
  mensajeExito: string = "";

  constructor(private auth: AuthService, private router: Router) {}

  async iniciar() {
    // Limpiar mensajes
    this.mensajeError = "";
    this.mensajeExito = "";
    
    console.log("Intentando login con:", this.correo);
    
    if (!this.correo || !this.password) {
      this.mensajeError = "❌ Por favor complete todos los campos";
      console.log("Campos vacíos");
      return;
    }
    
    this.cargando = true;

    try {
      const resultado = await this.auth.iniciarSesion(this.correo, this.password);
      console.log("Login exitoso:", resultado);
      this.mensajeExito = "✅ Inicio de sesión exitoso";
      
      setTimeout(() => {
        this.router.navigate(["/inicio"]);
      }, 800);
    } catch (error: any) {
      console.log("Error capturado:", error.code, error.message);
      
      // Todos los errores de credenciales muestran el mismo mensaje
      if (error.code === 'auth/invalid-credential' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password') {
        this.mensajeError = "❌ Credenciales incorrectas. Verifique su correo y contraseña.";
      } else if (error.code === 'auth/invalid-email') {
        this.mensajeError = "❌ Formato de correo electrónico inválido.";
      } else if (error.code === 'auth/too-many-requests') {
        this.mensajeError = "❌ Demasiados intentos. Intente más tarde.";
      } else {
        this.mensajeError = `❌ Error: ${error.message}`;
      }
    }
    
    this.cargando = false;
  }
}