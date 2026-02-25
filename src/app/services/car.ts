import { Injectable, signal, computed, effect } from '@angular/core';
import { Platillo } from './menu';

export interface ItemCarrito {
  id: number;
  platillo: Platillo;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class Car {
  // Estado interno (writable) y lectura pública (readonly)
  private readonly _items = signal<ItemCarrito[]>([]);
  readonly items = this._items.asReadonly();
  // Derivados (lectura): subtotal, impuestos y total
  readonly subtotal = computed(
    () => this._items().reduce((acc, it) => acc + it.platillo.precio * it.cantidad, 0)
  );
  // IVA configurable; aquí usamos 16% como ejemplo
  readonly iva = computed(() => this.subtotal() * 0.16);
  readonly total = computed(() => this.subtotal() + this.iva());
  constructor() {
    // Persistencia simple en localStorage (opcional)
    const raw = localStorage.getItem('carrito');
    if (raw) {
      try { this._items.set(JSON.parse(raw) as ItemCarrito[]); } catch { }
    }
    effect(() => {
      localStorage.setItem('carrito', JSON.stringify(this._items()));
    });
  }
  // C - CREATE: Agregar platillo (si existe, suma cantidad)
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
  // R - READ: ya esta programado como this.items()
  // U - UPDATE: actualizar cantidad (si llega <= 0, se elimina)
  actualizarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) return this.eliminar(id);
    this._items.update(items => items.map(it => it.id === id ? { ...it, cantidad } : it));
  }
  // D - DELETE: eliminar un elemento por id
  eliminar(id: number): void {
    this._items.update(items => items.filter(it => it.id !== id));
  }
  // Vaciar carrito
  vaciar(): void {
    this._items.set([]);
  }
}