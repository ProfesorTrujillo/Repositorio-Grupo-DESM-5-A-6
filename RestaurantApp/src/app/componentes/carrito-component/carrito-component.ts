import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito-service';
import { UbicacionComponent } from "../ubicacion-component/ubicacion-component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PagoService } from '../../services/pago.service';

@Component({
selector: 'app-carrito',
standalone: true,
imports: [CommonModule, CurrencyPipe, UbicacionComponent, RouterLink, RouterLinkActive],
templateUrl: './carrito-component.html',
styleUrls: ['./carrito-component.css']
})



export class CarritoComponent {
  carrito = inject(CarritoService);
  pagoService = inject(PagoService);

  pagando = false;

  trackById = (_: number, it: any) => it.id;
  actualizarCantidad(id: number, valor: string | number) {
  const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;

  if (!Number.isNaN(cantidad)) {
    this.carrito.actualizarCantidad(id, cantidad);
    console.log('Cantidad actualizada:', { id, cantidad });
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