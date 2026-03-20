import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  crearSesionPago(total: number, description: string, cart: any[]) {
    return this.http.post<{ url: string }>(`${this.apiUrl}/create-checkout-session`, {
      total,
      description,
      cart
    });
  }

  confirmarPedido(sessionId: string) {
    return this.http.get<any>(`${this.apiUrl}/confirm-order?session_id=${sessionId}`);
  }
}