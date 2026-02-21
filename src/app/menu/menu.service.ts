import { Injectable } from '@angular/core';

export interface Platillo {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  destacado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private platillos: Platillo[] = [
    // Entradas
    {
      nombre: 'Sopa Azteca',
      descripcion: 'Caldo de chile pasilla, tortilla frita, queso fresco y crema',
      precio: 95,
      categoria: 'Entradas',
      destacado: true
    },
    {
      nombre: 'Guacamole Artesanal',
      descripcion: 'Aguacate hass, jitomate, cilantro y chile serrano',
      precio: 80,
      categoria: 'Entradas'
    },
    // Platos Fuertes
    {
      nombre: 'Arrachera a la Parrilla',
      descripcion: 'Marinada 24 hrs, acompañada de rajas y elote asado',
      precio: 245,
      categoria: 'Platos Fuertes',
      destacado: true
    },
    {
      nombre: 'Mole Negro Oaxaqueño',
      descripcion: 'Pollo de rancho en mole de 32 ingredientes, arroz rojo',
      precio: 210,
      categoria: 'Platos Fuertes'
    },
    {
      nombre: 'Camarones al Ajillo',
      descripcion: 'Camarones jumbo salteados en mantequilla, ajo y chile de árbol',
      precio: 275,
      categoria: 'Platos Fuertes'
    },
    // Postres
    {
      nombre: 'Chocoflan Casero',
      descripcion: 'Bizcocho de chocolate con flan napolitano y cajeta',
      precio: 85,
      categoria: 'Postres',
      destacado: true
    },
    {
      nombre: 'Arroz con Leche',
      descripcion: 'Receta de abuela, canela y piloncillo',
      precio: 65,
      categoria: 'Postres'
    },
    // Bebidas
    {
      nombre: 'Agua de Jamaica',
      descripcion: 'Flor de jamaica fresca, azúcar de caña',
      precio: 45,
      categoria: 'Bebidas'
    },
    {
      nombre: 'Horchata con Tuna',
      descripcion: 'Arroz molido, canela y tuna roja',
      precio: 55,
      categoria: 'Bebidas'
    }
  ];

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