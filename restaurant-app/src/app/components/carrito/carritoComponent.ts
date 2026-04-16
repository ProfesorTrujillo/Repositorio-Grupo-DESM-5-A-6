import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../services/carService';
import { RouterLink } from '@angular/router';
import { UbicacionComponent } from '../ubicacion/ubicacion';
import { PagoService } from '../../services/pago.service';

@Component({
selector: 'app-carrito',
standalone: true,
imports: [CommonModule, CurrencyPipe, RouterLink, UbicacionComponent],
templateUrl: './carrito.html',
styleUrl: './carrito.css'
})
export class CarritoComponent {
carrito = inject(CarritoService);
pagoService = inject(PagoService);

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
trackById = (_: number, it: any) => it.id;
actualizarCantidad(id: number, valor: string | number) {
const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;

if (!Number.isNaN(cantidad)) {
this.carrito.actualizarCantidad(id, cantidad);
console.log('Cantidad actualizada:', { id, cantidad });
}
}
}

