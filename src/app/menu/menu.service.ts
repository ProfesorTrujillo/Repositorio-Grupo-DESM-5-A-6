import { Injectable } from '@angular/core';

export interface Platillo {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  destacado?: boolean;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private platillos: Platillo[] = [
    // Entradas
    {
      id: 1,
      nombre: 'Sopa Azteca',
      descripcion: 'Caldo de chile pasilla, tortilla frita, queso fresco y crema',
      precio: 95,
      categoria: 'Entradas',
      destacado: true,
      disponible: true
    },
    {
      id: 2,
      nombre: 'Guacamole Artesanal',
      descripcion: 'Aguacate hass, jitomate, cilantro y chile serrano',
      precio: 80,
      categoria: 'Entradas',
      disponible: true
    },
    // Platos Fuertes
    {
      id: 3,
      nombre: 'Arrachera a la Parrilla',
      descripcion: 'Marinada 24 hrs, acompañada de rajas y elote asado',
      precio: 245,
      categoria: 'Platos Fuertes',
      destacado: true,
      disponible: true
    },
    {
      id: 4,
      nombre: 'Mole Negro Oaxaqueño',
      descripcion: 'Pollo de rancho en mole de 32 ingredientes, arroz rojo',
      precio: 210,
      categoria: 'Platos Fuertes',
      disponible: true
    },
    {
      id: 5,
      nombre: 'Camarones al Ajillo',
      descripcion: 'Camarones jumbo salteados en mantequilla, ajo y chile de árbol',
      precio: 275,
      categoria: 'Platos Fuertes',
      disponible: false
    },
    // Postres
    {
      id: 6,
      nombre: 'Chocoflan Casero',
      descripcion: 'Bizcocho de chocolate con flan napolitano y cajeta',
      precio: 85,
      categoria: 'Postres',
      destacado: true,
      disponible: true
    },
    {
      id: 7,
      nombre: 'Arroz con Leche',
      descripcion: 'Receta de abuela, canela y piloncillo',
      precio: 65,
      categoria: 'Postres',
      disponible: true
    },
    // Bebidas
    {
      id: 8,
      nombre: 'Agua de Jamaica',
      descripcion: 'Flor de jamaica fresca, azúcar de caña',
      precio: 45,
      categoria: 'Bebidas',
      disponible: true
    },
    {
      id: 9,
      nombre: 'Horchata con Tuna',
      descripcion: 'Arroz molido, canela y tuna roja',
      precio: 55,
      categoria: 'Bebidas',
      disponible: true
    }
  ];

  obtenerPlatillos(): Platillo[] {
    return this.platillos;
  }

  getPlatillos(): Platillo[] {
    return this.platillos;
  }

  getCategorias(): string[] {
    return [...new Set(this.platillos.map(p => p.categoria))];
  }

  getPorCategoria(categoria: string): Platillo[] {
    return this.platillos.filter(p => p.categoria === categoria);
  }
}