import { Injectable, signal, computed, effect } from '@angular/core';
import { Platillo } from '../menu/menu.service';

export interface ItemCarrito {
  id: number;        // id del platillo (clave)
  platillo: Platillo;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

  // Estado interno (writable) y lectura pública (readonly)
  private readonly _items = signal<ItemCarrito[]>([]);
  readonly items = this._items.asReadonly();

  // Derivados con computed: subtotal, IVA 16% y total
  readonly subtotal = computed(
    () => this._items().reduce((acc, it) => acc + it.platillo.precio * it.cantidad, 0)
  );
  readonly iva     = computed(() => this.subtotal() * 0.16);
  readonly total   = computed(() => this.subtotal() + this.iva());

  constructor() {
    // Persistencia simple en localStorage
    try {
      const raw = localStorage.getItem('carrito');
      if (raw) {
        this._items.set(JSON.parse(raw) as ItemCarrito[]);
      }
    } catch { /* silenciar errores de SSR o JSON inválido */ }

    effect(() => {
      localStorage.setItem('carrito', JSON.stringify(this._items()));
    });
  }

  // C - CREATE: agregar platillo (si ya existe, suma cantidad)
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

  // R - READ: expuesto como this.items()

  // U - UPDATE: actualizar cantidad (si llega <= 0, elimina)
  actualizarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) { this.eliminar(id); return; }
    this._items.update(items =>
      items.map(it => it.id === id ? { ...it, cantidad } : it)
    );
  }

  // D - DELETE: eliminar por id
  eliminar(id: number): void {
    this._items.update(items => items.filter(it => it.id !== id));
  }

  // Vaciar todo el carrito
  vaciar(): void {
    this._items.set([]);
  }
}