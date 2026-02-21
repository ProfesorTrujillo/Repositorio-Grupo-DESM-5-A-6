import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private platillos = [
    { nombre: 'Tacos al Pastor', precio: 15.00, desc: 'Cerdo marinado con piña, cebolla y cilantro.' },
    { nombre: 'Chiles en Nogada', precio: 22.00, desc: 'Chile poblano relleno bañado en crema de nuez y granada.' },
    { nombre: 'Enchiladas Verdes', precio: 12.50, desc: 'Tortillas rellenas de pollo con salsa de tomatillo y queso.' },
    { nombre: 'Pozole Rojo', precio: 14.00, desc: 'Caldo de maíz cacahuazintle con carne de cerdo y especias.' }
  ];

  getMenu() { return this.platillos; }
}
