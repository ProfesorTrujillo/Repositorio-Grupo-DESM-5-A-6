import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './servicios/firebase';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {

  lista: any[] = [];

  constructor(private firebase: FirebaseService) {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.lista = await this.firebase.obtenerDocumentos('inventario-prueba');
  }

  async agregar() {
    console.log("Botón presionado 🚀");

    await this.firebase.agregarDocumento('inventario-prueba', {
      mensaje: "Conexión exitosa Angular 21 + Firebase",
      fecha: new Date().toISOString()
    });

    this.cargarDatos();
  }

}