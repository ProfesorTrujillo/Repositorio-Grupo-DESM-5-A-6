import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Car, ItemCarrito } from '../../services/car';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  carrito = inject(Car);
  trackById = (_: number, it: any) => it.id;
  actualizarCantidad(id: number, valor: string | number) {
    const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;
    if (!Number.isNaN(cantidad)) {
      this.carrito.actualizarCantidad(id, cantidad);
      console.log('Cantidad actualizada:', { id, cantidad });
    }
  }
}
