import { Injectable } from '@angular/core';

export interface Platillo {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
}

@Injectable({ providedIn: 'root' })
export class MenuService {

  private platillos: Platillo[] = [
    {
      id: 1,
      nombre: 'Tacos al Pastor',
      precio: 15.00,
      imagen: '',
      descripcion: 'Cerdo marinado con piña, cebolla y cilantro.',
      disponible: true
    },
    {
      id: 2,
      nombre: 'Chiles en Nogada',
      precio: 22.00,
      imagen: '',
      descripcion: 'Chile poblano relleno bañado en crema de nuez y granada.',
      disponible: true
    },
    {
      id: 3,
      nombre: 'Enchiladas Verdes',
      precio: 12.50,
      imagen: '',
      descripcion: 'Tortillas rellenas de pollo con salsa de tomatillo y queso.',
      disponible: true
    },
    {
      id: 4,
      nombre: 'Pozole Rojo',
      precio: 14.00,
      imagen: '',
      descripcion: 'Caldo de maíz cacahuazintle con carne de cerdo y especias.',
      disponible: false
    }
  ];

  obtenerPlatillos(): Platillo[] {
    return this.platillos;
  }
}
