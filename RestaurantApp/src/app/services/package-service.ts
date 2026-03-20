import { Injectable } from '@angular/core';

export interface viaje {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  categoria: string;
  imagen: string,
  estado: boolean;
}

@Injectable({  providedIn: 'root',})

export class viajes {

  private reservas: viaje[] = [];
  private viajes: viaje[] = [ 
    {id: 1, nombre: 'Japon Esencial', descripcion: 'Recorrido por templos antiguos y ciudades tecnológicas en Japón.', precio: 45500, duracion: 12, imagen: 'https://www.advantour.com/img/japan/images/index.jpg', categoria: 'Cultura', estado: true},
    {
      id: 2, nombre: 'Alpes Suizos y Lagos de Cristal', descripcion: 'Un recorrido inolvidable por los picos más altos de Europa.', precio: 35500, duracion: 3, categoria: 'Naturaleza', imagen: 'https://blog.localadventures.mx/wp-content/uploads/2023/01/6-1-1024x553.png', estado: true}

  ];

  obtenerViajes(): viaje[] {
    return this.viajes;
  }

  agregarViaje(v: viaje) {
    if(v.estado){
      this.reservas.push(v);
    }
  }
  }
