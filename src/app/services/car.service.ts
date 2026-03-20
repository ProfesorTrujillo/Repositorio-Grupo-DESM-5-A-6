import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Platillo } from './menu.service';

export interface ItemCarrito {
  id: number;
  platillo: Platillo;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly _items = signal<ItemCarrito[]>([]);
  readonly items = this._items.asReadonly();

  readonly subtotal = computed(
    () => this._items().reduce((acc, it) => acc + it.platillo.precio * it.cantidad, 0)
  );

  readonly iva = computed(() => this.subtotal() * 0.16);
  readonly total = computed(() => this.subtotal() + this.iva());

  constructor() {

    // SOLO en navegador
    if (this.isBrowser) {
      const raw = localStorage.getItem('carrito');
      if (raw) {
        try {
          this._items.set(JSON.parse(raw) as ItemCarrito[]);
        } catch {}
      }

      effect(() => {
        localStorage.setItem('carrito', JSON.stringify(this._items()));
      });
    }
  }

  agregar(platillo: Platillo, cantidad = 1): void {
    this._items.update(items => {
      const i = items.findIndex(x => x.id === platillo.id);
      if (i >= 0) {
        const copia = [...items];
        copia[i] = { ...copia[i], cantidad: copia[i].cantidad + cantidad };
        return copia;
      }
      return [...items, { id: platillo.id, platillo, cantidad }];
    });
  }

  actualizarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) return this.eliminar(id);
    this._items.update(items =>
      items.map(it => it.id === id ? { ...it, cantidad } : it)
    );
  }

  eliminar(id: number): void {
    this._items.update(items => items.filter(it => it.id !== id));
  }

  vaciar(): void {
    this._items.set([]);
  }
}