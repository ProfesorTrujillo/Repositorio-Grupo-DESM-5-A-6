import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CarritoService } from './carrito-service';


@Injectable({ providedIn: 'root' })
export class PagoService {

    private readonly LLAVE_PUBLICA_STRIPE = 'pk_live_51TCK9d39BYzxll2Ay8rByYfucwo8gXlBJJZYbM87N7bHSP501gw9cDUSfvRwlGrvcsG3CBYfUgdyoXOUKQMkupoe00mcnT7RjI';

    private readonly backendUrl = 'http://localhost:3000';

    constructor(
        private http: HttpClient,
        private carrito: CarritoService,
    ) { }

    async iniciarPago(): Promise<void> {
        const items = this.carrito.items();
        const subtotal = this.carrito.subtotal();
        const iva = this.carrito.iva();
        const envio = this.carrito.envio();
        const total = this.carrito.total();

        if (items.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        try {
            // Llama al backend para obtener la URL de Stripe Checkout
            const respuesta = await firstValueFrom(
                this.http.post<{ url: string }>(`${this.backendUrl}/crear-sesion`, {
                    items,
                    subtotal,
                    iva,
                    envio,
                    total,
                    descripcion: `Pedido de restaurante — ${items.length} platillo(s)`,
                })
            );

            if (respuesta?.url) {
                // Redirigir al usuario a la página de pago de Stripe
                window.location.href = respuesta.url;
            } else {
                alert('No se recibió URL de pago. Intenta de nuevo.');
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Error desconocido';
            console.error('Error al iniciar pago:', msg);
            alert('Error al conectar con el servidor de pagos. ¿Está corriendo el backend?\n' + msg);
        }
    }
}