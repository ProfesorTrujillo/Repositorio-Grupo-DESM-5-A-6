import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html'
})
export class InicioComponent {

  constructor(private auth: AuthService, private router: Router) {}

  cerrar() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }

  irAproductos() {
    this.router.navigate(['/productos']);
  }
}