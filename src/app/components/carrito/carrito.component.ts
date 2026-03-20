import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/car.service';
import { PagoService } from '../../services/pago.service';
import { UbicacionComponent } from '../ubicacion/ubicacion.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, UbicacionComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito = inject(CarritoService);
  pagoService = inject(PagoService);

  pagando = false; // estado de carga mientras redirige a Stripe

  trackById = (_: number, it: { id: number }) => it.id;

  actualizarCantidad(id: number, valor: string | number): void {
    const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;
    if (!Number.isNaN(cantidad)) {
      this.carrito.actualizarCantidad(id, cantidad);
    }
  }

  async pagar(): Promise<void> {
    if (this.pagando) return;
    this.pagando = true;
    try {
      await this.pagoService.iniciarPago();
    } finally {
      this.pagando = false;
    }
  }
}
