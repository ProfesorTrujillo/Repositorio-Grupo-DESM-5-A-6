import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu {

  platillos = [
    { nombre: 'Tacos al Pastor', precio: 40 },
    { nombre: 'Enchiladas Verdes', precio: 55 },
    { nombre: 'Hamburguesa Especial', precio: 100 },
    { nombre: 'Pizza Pepperoni', precio: 99 },
    { nombre: 'quesadilla de Pollo', precio: 30 },
    { nombre: 'Refresco', precio: 30 }
  ];

}
