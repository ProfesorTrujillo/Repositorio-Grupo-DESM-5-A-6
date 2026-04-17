import { Injectable } from '@angular/core';

export interface Platillo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean; // Necesario para la lógica del botón "Agregar" [cite: 223]
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private platillos = [
    { id: 1, nombre: 'Tacos al Pastor', descripcion: 'Deliciosos tacos con piña y carne adobada', precio: 45, disponible: true },
    { id: 2, nombre: 'Enchiladas Verdes', descripcion: 'Rellenas de pollo y bañadas en salsa verde', precio: 60, disponible: true },
    { id: 3, nombre: 'Pozole Rojo', descripcion: 'Tradicional con carne de cerdo y maíz pozolero', precio: 75, disponible: false },
    { id: 4, nombre: 'Agua de Horchata', descripcion: 'Refrescante bebida tradicional', precio: 25, disponible: true },
    { id: 5, nombre: 'Chiles Rellenos', descripcion: 'Chiles rellenos con queso y carne molida', precio: 80, disponible: true },
    { id: 6, nombre: 'Sopes', descripcion: 'Tortillas con frijoles, queso y carne molida', precio: 50, disponible: true },
    { id: 7, nombre: 'Enchiladas Rojas', descripcion: 'Rellenas de pollo y bañadas en salsa roja', precio: 65, disponible: true },
    { id: 8, nombre: 'Tostadas de Ceviche', descripcion: 'Tostadas crujientes con ceviche fresco', precio: 55, disponible: true },
    { id: 9, nombre: 'Tamales', descripcion: 'Tamales de pollo con salsa verde', precio: 40, disponible: true },
    { id: 10, nombre: 'Agua de Jamaica', descripcion: 'Bebida refrescante de flor de jamaica', precio: 25, disponible: true }
  ];

  getPlatillos(): Platillo[] {
    return this.platillos;
  }
}