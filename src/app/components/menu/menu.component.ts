import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MenuService, Platillo } from '../../services/menu.service';
import { CarritoService } from '../carrito/carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],  // ← CarritoService NO va aquí
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private readonly menuService = inject(MenuService);
  
  // QUITA "private" para que el template pueda leer itemCount()
  readonly carrito = inject(CarritoService);

  platillos: Platillo[] = this.menuService.obtenerPlatillos();

  trackById = (_: number, p: Platillo) => p.id;

  agregar(p: Platillo) {
    if (p.disponible) {
      this.carrito.agregarItem({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio
      });
      console.log('Agregado:', p.nombre);
    }
  }
}