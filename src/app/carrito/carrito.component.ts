import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarService } from '../services/car.service';
import { RouterLink } from '@angular/router';
import { PagoService } from '../services/pago.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent {

  carrito = inject(CarService);

  pagoService = inject(PagoService);

  actualizarCantidad(id: number, cantidad: number) {

    if (cantidad <= 0) {
      this.carrito.eliminar(id);
      return;
    }

    this.carrito.actualizarCantidad(id, cantidad);
  }

  pagar() {

    const pedido = {
      items: this.carrito.items(),
      subtotal: this.carrito.subtotal(),
      iva: this.carrito.iva(),
      envio: this.carrito.envio(),
      total: this.carrito.total()
    };

    this.pagoService.pagar(pedido);
  }
}