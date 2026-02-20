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
    { nombre: 'Tacos de Cabeza', precio: 40 },
    { nombre: 'Enchiladas Verdes', precio: 55 },
    { nombre: 'Hamburguesa Loka', precio: 100 },
    { nombre: 'Pizza Margherita', precio: 99 },
    { nombre: 'Torta de Chorizo', precio: 30 },
    { nombre: 'Refresco', precio: 30 }
  ];

}
