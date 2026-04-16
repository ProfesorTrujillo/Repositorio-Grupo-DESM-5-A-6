import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- ¡Esta es la magia!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- Y aquí lo declaramos
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Ya no necesitamos el código viejo de FirebaseService aquí, 
  // porque el Router se encargará de mostrar el Login o el Registro.
}