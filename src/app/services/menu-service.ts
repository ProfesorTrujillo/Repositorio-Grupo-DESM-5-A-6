import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  getPlatillos(): { id: number, nombre: string, precio: number, disponible: boolean}[] {
    return [
      { id: 1, nombre: 'Tacos', precio: 10, disponible: true}, 
      { id: 2, nombre: 'Burritos', precio: 12, disponible: true}, 
      { id: 3, nombre: 'Quesadillas', precio: 8, disponible: true}, 
      { id: 4, nombre: 'Enchiladas', precio: 15, disponible: true},
      { id: 5, nombre: 'Chiles Rellenos', precio: 14, disponible: true},
      { id: 6, nombre: 'Tamales', precio: 9, disponible: true},
      { id: 7, nombre: 'Pozole', precio: 13, disponible: true},
      { id: 8, nombre: 'Mole', precio: 16, disponible: true},
      { id: 9, nombre: 'Chilaquiles', precio: 11, disponible: true},
      { id: 10, nombre: 'Sopes', precio: 7, disponible: true}];
  }
}
