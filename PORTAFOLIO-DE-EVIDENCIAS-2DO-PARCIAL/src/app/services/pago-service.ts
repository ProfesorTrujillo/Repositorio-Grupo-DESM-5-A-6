import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from './carrito-service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private http = inject(HttpClient);
  private carrito = inject(CarritoService);

  pagar() {
    const body = {
      items: this.carrito.items(),
      subtotal: this.carrito.subtotal(),
      iva: this.carrito.iva(),
      envio: this.carrito.envio(),
      total: this.carrito.total()
    };

    this.http.post<any>('http://localhost:4242/crear-checkout-session', body)
      .subscribe({
        next: (res) => {
          window.location.href = res.url;
        },
        error: (err) => {
          console.error('Error en pago', err);
          alert('Error al procesar el pago');
        }
      });
  }
}