import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CarritoService } from './car.service';

// ================================================================
//  Servicio de Pagos con Stripe
//  Basado en la Guía Paso a Paso 3.2 de Stripe en Angular
//
//  Este servicio usa DOS llaves:
//
//  1. LLAVE PÚBLICA (pk_test_...) → se usa aquí en el frontend
//     para cargar @stripe/stripe-js.
//     Se puede exponer en Angular de forma segura.
//
//  2. LLAVE SECRETA (sk_test_...) → NUNCA va aquí.
//     Vive SOLO en backend/server.js mediante la variable .env
//
// ================================================================

@Injectable({ providedIn: 'root' })
export class PagoService {
    // ------------------------------------------------------------------
    //  ⚠️  REEMPLAZA ESTE VALOR con tu Publishable Key (pk_test_...)
    //      La encuentras en: Stripe Dashboard → Developers → API Keys
    // ------------------------------------------------------------------
    private readonly LLAVE_PUBLICA_STRIPE = 'AQUI_VA_TU_LLAVE_PUBLICA_PK_TEST_XXXXXXXXXX';

    // URL del backend seguro (donde vive la llave SECRETA)
    private readonly backendUrl = 'http://localhost:3000';

    constructor(
        private http: HttpClient,
        private carrito: CarritoService,
    ) { }

    /**
     * Inicia el pago:
     * 1. Llama al backend para crear la Stripe Checkout Session.
     * 2. El backend usa la LLAVE SECRETA para crear la sesión.
     * 3. Redirige al usuario a la URL de pago de Stripe.
     */
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
