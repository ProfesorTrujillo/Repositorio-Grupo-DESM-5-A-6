import { Injectable } from '@angular/core';

export interface Platillo {
  id: number;  
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  obtenerMenu() {
  return [
    {
      id: 1,
      nombre: 'Tacos',
      descripcion: 'Tacos al pastor y bistec',
      precio: 80,
      disponible: true
    },
    {
      id: 2,
      nombre: 'Enchiladas',
      descripcion: 'Enchiladas rojas',
      precio: 95,
      disponible: true
    },
    {
      id: 3,
      nombre: 'Pozole',
      descripcion: 'Pozole rojo',
      precio: 120,
      disponible: true
    },
    {
      id: 4,
      nombre: 'Quesadillas',
      descripcion: 'Quesadillas',
      precio: 60,
      disponible: false
    },
    {
      id: 5,
      nombre: 'Pizza',
      descripcion: 'Pizza de pepperoni',
      precio: 150,
      disponible: true
    },
    {
      id: 6,
      nombre: 'Hamburguesa',
      descripcion: 'Hamburguesa con papas',
      precio: 110,
      disponible: true
    },
    {
      id: 7,
      nombre: 'Sushi',
      descripcion: 'Rollos de sushi variados',
      precio: 180,
      disponible: true
    }
  ];
}

}