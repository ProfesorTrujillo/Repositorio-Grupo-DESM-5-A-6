import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from './carrito.service';
import { UbicacionComponent } from '../ubicacion/ubicacion.component';
import { PagoService } from '../../services/pago.service';

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

  trackById = (_: number, item: any) => item.id;

  actualizarCantidad(id: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const cantidad = parseInt(input.value, 10);
    if (!isNaN(cantidad)) {
      this.carrito.actualizarCantidad(id, cantidad);
    }
  }

  eliminarItem(id: number): void {
    this.carrito.eliminarItem(id);
  }

  vaciarCarrito(): void {
    if (confirm('¿Vaciar todo el carrito?')) {
      this.carrito.vaciar();
    }
  }

  procederAlPago(): void {
    const total = this.carrito.total();
    const description = `Pedido de comida - Envío $${this.carrito.envio() || 120}`;

    this.pagoService.crearSesionPago(total, description, this.carrito.items()).subscribe({
      next: (res) => window.location.href = res.url,
      error: (err) => {
        console.error(err);
        alert('Error al conectar con el servidor de pago');
      }
    });
  }
}