import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './services/firebase';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  lista: any[] = [];

  constructor(private firebase: FirebaseService) {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.lista = await this.firebase.obtenerDocumentos("inventario-prueba");
  }

  async agregar() {
    await this.firebase.agregarDocumento("inventario-prueba", {
      mensaje: "Conexión exitosa Angular moderno + Firebase",
      fecha: new Date().toISOString()
    });

    // refrescar lista
    this.cargarDatos();
  }
}
