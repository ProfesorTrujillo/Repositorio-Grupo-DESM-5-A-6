import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../../servicios/firebase';
@Component({
selector: 'app-inicio',
standalone: true,
imports: [CommonModule],
templateUrl: './inicio.component.html'
})
export class InicioComponent {
  lista: any[] = [];
  mensajeExito: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.lista = await this.firebase.obtenerDocumentos("inventario-prueba");
  }

  async agregar() {
    await this.firebase.agregarDocumento("inventario-prueba", {
      mensaje: "¡El botón funciona!",
      fecha: new Date().toISOString()
    });
    this.mensajeExito = "¡Dato agregado a Firebase!";
    this.cargarDatos(); // Recargar la lista
    setTimeout(() => this.mensajeExito = '', 2000);
  }

  cerrar() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }

  irAProductos() {
    this.router.navigate(['/productos']);
  }
}
