import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  );

  readonly iva = computed(() => this.subtotal() * 0.16);

  readonly envio = signal<number>(0);

  readonly total = computed(() => this.subtotal() + this.iva() + this.envio());

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.cantidad, 0)
  );

  agregarItem(nuevoItem: Omit<CartItem, 'cantidad'>): void {
    this._items.update(currentItems => {
      const existeIndex = currentItems.findIndex(i => i.id === nuevoItem.id);
      if (existeIndex !== -1) {
        const updated = [...currentItems];
        updated[existeIndex] = {
          ...updated[existeIndex],
          cantidad: updated[existeIndex].cantidad + 1
        };
        return updated;
      } else {
        return [...currentItems, { ...nuevoItem, cantidad: 1 }];
      }
    });
  }

  actualizarCantidad(id: number, nuevaCantidad: number): void {
    if (nuevaCantidad < 1) {
      this.eliminarItem(id);
      return;
    }
    this._items.update(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  }

  eliminarItem(id: number): void {
    this._items.update(currentItems =>
      currentItems.filter(item => item.id !== id)
    );
  }

  vaciar(): void {
    this._items.set([]);
    this.envio.set(0);
  }

  setEnvio(monto: number): void {
    this.envio.set(Math.max(0, Math.round(monto)));
  }
}