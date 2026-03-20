import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { GeolocalizacionService } from './geolocalizacion.service';

export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarService {

  private geo = inject(GeolocalizacionService);

  private readonly _items = signal<ItemCarrito[]>([]);
  readonly items = this._items.asReadonly();

  readonly subtotal = computed(() =>
    this._items().reduce((acc, it) => acc + it.precio * it.cantidad, 0)
  );

  readonly iva = computed(() => this.subtotal() * 0.16);

  readonly envio = signal<number>(0);

  readonly total = computed(() =>
    this.subtotal() + this.iva() + this.envio()
  );

  constructor() {

    effect(() => {

      const distancia = this.geo.distanciaKm();

      if (distancia != null) {

        const costo = Math.min(
          Math.max(25, Math.round(distancia * 18)),
          120
        );

        this.envio.set(costo);
      }

    });

  }

  agregar(platillo: any) {
    this._items.update(items => {
      const existe = items.find(x => x.id === platillo.id);

      if (existe) {
        return items.map(x =>
          x.id === platillo.id
            ? { ...x, cantidad: x.cantidad + 1 }
            : x
        );
      }

      return [...items, { ...platillo, cantidad: 1 }];
    });
  }

  actualizarCantidad(id: number, cantidad: number) {

    if (cantidad <= 0) {
      this.eliminar(id);
      return;
    }

    this._items.update(items =>
      items.map(x =>
        x.id === id ? { ...x, cantidad } : x
      )
    );
  }

  eliminar(id: number) {
    this._items.update(items =>
      items.filter(x => x.id !== id)
    );
  }

  vaciar() {
    this._items.set([]);
    this.envio.set(0);
  }
}