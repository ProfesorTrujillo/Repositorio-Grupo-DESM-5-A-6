import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './servicios/firebase';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('inventario-app');
  lista: any[] = [];
  constructor(private firebase: FirebaseService) {
  this.cargarDatos();
}

async cargarDatos() {
  this.lista = await this.firebase.obtenerDocumentos("inventario-prueba");
}

async agregar() {
await this.firebase.agregarDocumento("inventario-prueba", {
mensaje: "Conexión exitosa Angular 21 + Firebase",
fecha: new Date().toISOString()
});
}
}

