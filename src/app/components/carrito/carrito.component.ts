import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/car.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito = inject(CarritoService);

  trackById = (_: number, it: { id: number }) => it.id;

  actualizarCantidad(id: number, valor: string | number): void {
    const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;
    if (!Number.isNaN(cantidad)) {
      this.carrito.actualizarCantidad(id, cantidad);
    }
  }
}