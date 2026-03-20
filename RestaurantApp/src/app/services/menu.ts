import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private platillos = [
    { nombre: 'Torta de cabeza', precio: 67, descripcion: 'Con queso o sin queso' },
    { nombre: 'Tacos de chicharron', precio: 16, descripcion: 'Con o sin cebolla' },
    { nombre: 'Quesabirria', precio: 85, descripcion: 'Solo los jueves' }
  ];

  getMenu() {
    return this.platillos;
  }
}