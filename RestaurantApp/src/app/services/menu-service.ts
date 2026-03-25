import { Injectable } from '@angular/core';

export interface Platillo {
  id: number;
  nombre: string;
  descripcion: string;
  categoria : string;
  precio: number;
  disponibilidad: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Platillos {

  private platillos: Platillo[] = [ 
    {id: 1, nombre: 'El incio después del fin', categoria: 'ksks', descripcion:  'TurtleMe', precio: 19.99,  disponibilidad: true},
    {id: 2, nombre: 'Coraline', categoria:'sdasd', descripcion:  'Neil Gaiman',  precio: 30, disponibilidad: false},
  
  ];

  obtenerPlatillos(): Platillo[] {
    return this.platillos;
  }
}

