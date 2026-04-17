import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private http = inject(HttpClient);

  pagar(datosPedido: any) {
    this.http.post<{url: string, folio: string}>('http://localhost:3000/create-checkout-session', datosPedido)
      .subscribe(res => {
        localStorage.setItem('ultimo_folio', res.folio); // Guardamos el folio para la pantalla de éxito
        window.location.href = res.url; // Redirigir a Stripe
      });
  }
}