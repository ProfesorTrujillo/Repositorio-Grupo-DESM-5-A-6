import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  getMenu() {
  return [
    {
      nombre: 'Tacos al Pastor',
      precio: 50,
      imagen: 'img/pastor.jpg'
    },
    {
      nombre: 'Enchiladas Verdes',
      precio: 70,
      imagen: 'img/enchiladas.jpeg'
    },
    {
      nombre: 'Hamburguesa Especial',
      precio: 90,
      imagen: 'img/hamburguesa.jpg'
    },
    {
      nombre: 'Agua de Horchata',
      precio: 30,
      imagen: 'img/horchata.jpg'
    }
  ];
}
}