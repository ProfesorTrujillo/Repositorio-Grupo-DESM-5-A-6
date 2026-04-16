import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/authService';
import { Router } from '@angular/router';

@Component({
selector: 'app-inicio',
standalone: true,
imports: [CommonModule],
templateUrl: './inicio.html',
styleUrls: ['./inicio.css']
})
export class InicioComponent {

    constructor(private auth: AuthService, private router: Router) {}
    
    irAProductos() {
        this.router.navigate(['/productos']);
    }

    cerrar() {
        this.auth.cerrarSesion();
        this.router.navigate(['/login']);
    }
}
