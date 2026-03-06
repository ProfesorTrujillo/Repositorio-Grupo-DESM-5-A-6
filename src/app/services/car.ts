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

  // En car.service.ts agregar:
  readonly distancia = signal<number>(0); // en kilómetros

  // El costo de envío: $5 por km (ejemplo)
  readonly costoEnvio = computed(() => {
    const d = this.distancia();
    return d > 0 ? d * 5 : 0;
  });

  // Actualizar el total final para incluir el envío
  
  // IVA configurable; aquí usamos 16% como ejemplo
  readonly iva = computed(() => this.subtotal() * 0.16);
  
  readonly total = computed(() => this.subtotal() + this.iva() + this.costoEnvio());
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
  // Establecer el costo de envío basado en la distancia
  setEnvio(costoPesos: number): void {
    // Convertir el costo a distancia: si costo = distancia * 5, entonces distancia = costo / 5
    const distancia = costoPesos / 5;
    this.distancia.set(distancia);
  }
}