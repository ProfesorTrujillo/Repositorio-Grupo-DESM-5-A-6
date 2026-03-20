import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getMenu() {
  return [
    {
      id:1,
      nombre: 'Tacos al Pastor',
      precio: 50,
      imagen: 'img/pastor.jpg',
      disponible: true
    },
    {
      id:2,
      nombre: 'Enchiladas Verdes',
      precio: 70,
      imagen: 'img/enchiladas.jpeg',
      disponible: true
    },
    {
      id:3,
      nombre: 'Hamburguesa Especial',
      precio: 90,
      imagen: 'img/hamburguesa.jpg',
      disponible: false
    },
    {
      id:4,
      nombre: 'Agua de Horchata',
      precio: 30,
      imagen: 'img/horchata.jpg',
      disponible: true
    },
    {
      id:5,
      nombre: 'Sopa azteca',
      precio: 80,
      imagen: 'img/sopaAzteca.jpg',
      disponible: true
    },
    {
      id:6,
      nombre: 'Spaghetti a la boloñesa',
      precio: 60,
      imagen: 'img/espagueti.jpeg',
      disponible: false
    },
    {
      id:7,
      nombre: 'Crema de champiñones',
      precio: 55,
      imagen: 'img/cremaChampinones.jpg',
      disponible: true
    },
    {
      id:8,
      nombre: 'Agua de Jamaica',
      precio: 30,
      imagen: 'img/jamaica.jpg',
      disponible: true
    }
  ];
}
}