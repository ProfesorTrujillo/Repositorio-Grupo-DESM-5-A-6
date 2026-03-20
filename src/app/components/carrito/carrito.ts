import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Car, ItemCarrito } from '../../services/car';
import { StripeService } from '../../services/stripe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})

export class Carrito {
  // Inyecciones de servicios
  public carrito = inject(Car);
  private stripeService = inject(StripeService);

  trackById = (_: number, it: any) => it.id;

  actualizarCantidad(id: number, valor: string | number) {
    const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;
    if (!Number.isNaN(cantidad)) {
      this.carrito.actualizarCantidad(id, cantidad);
    }
  }

  // 👈 NUEVO: Función para iniciar el flujo de pago (Punto 1 y 2)
  pagar() {
    console.log("Iniciando proceso de pago con Stripe...");
    localStorage.setItem('ultimo_total', this.carrito.total().toString());
    const datosPedido = {
      items: this.carrito.items(),
      envio: this.carrito.costoEnvio(), // Viene del cálculo de distancia en el mapa
      total: this.carrito.total()      // Total calculado con Signal
    };

    if (datosPedido.items.length > 0) {
      this.stripeService.pagar(datosPedido);
    } else {
      alert("El carrito está vacío");
    }
  }
}
