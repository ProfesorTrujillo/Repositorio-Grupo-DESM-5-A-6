import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './app/services/firebase';
import { RouterOutlet } from '@angular/router';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, RouterOutlet],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
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
