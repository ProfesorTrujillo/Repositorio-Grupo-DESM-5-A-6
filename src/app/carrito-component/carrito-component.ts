import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarritoService } from '../services/carrito-service';
import { UbicacionComponent } from '../ubicacion-component/ubicacion-component';

@Component({
  selector: 'app-carrito-component',
  imports: [CommonModule, CurrencyPipe, UbicacionComponent],
  templateUrl: './carrito-component.html',
  styleUrl: './carrito-component.css',
})
export class CarritoComponent {
  carrito = inject(CarritoService);
  trackById = (_: number, it: any) => it.id;
  actualizarCantidad(id: number, valor: string | number) {
    const cantidad = typeof valor === 'string' ? parseInt(valor, 10) : valor;
    if (!Number.isNaN(cantidad)) {
      this.carrito.actualizarCantidad(id, cantidad);
      console.log('Cantidad actualizada:', { id, cantidad });
    }
  }
}
