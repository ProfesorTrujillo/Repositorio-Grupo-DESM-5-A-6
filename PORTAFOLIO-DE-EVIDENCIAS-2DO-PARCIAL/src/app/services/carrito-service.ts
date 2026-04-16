import { effect, Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CarritoItem {
  id: number;
  platillo: { id: number, nombre: string, precio: number, disponible: boolean };
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly _items = signal<CarritoItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly subtotal = computed(() =>
    this._items().reduce((total, item) =>
      total + item.platillo.precio * item.cantidad, 0)
  );
  readonly iva = computed(() => this.subtotal() * 0.16);
  readonly envio = signal<number>(0);
  readonly total = computed(() => this.subtotal() + this.iva() + this.envio());

  constructor() {

    // 🔹 Solo leer localStorage si estamos en el navegador
    if (this.isBrowser) {
      const rawItems = localStorage.getItem('carrito');
      if (rawItems) {
        try {
          this._items.set(JSON.parse(rawItems) as CarritoItem[]);
        } catch (e) {
          console.error('Error parsing carrito from localStorage', e);
        }
      }

      // 🔹 Guardar automáticamente cuando cambie el carrito
      effect(() => {
        localStorage.setItem('carrito', JSON.stringify(this._items()));
      });
    }
  }

  agregar(platillo: { id: number, nombre: string, precio: number, disponible: boolean }, cantidad = 1): void {
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

  setEnvio(monto: number): void {
    this.envio.set(Math.max(0, Math.round(monto)));
  }
}