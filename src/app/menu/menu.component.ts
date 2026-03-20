import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  private carrito = inject(CarService);

  menu: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menu = this.menuService.getMenu();
  }

  agregar(p: any) {
    this.carrito.agregar(p);
  }

  quitar(p: any) {
    const item = this.carrito.items().find(x => x.id === p.id);
    if (item) {
      this.carrito.actualizarCantidad(p.id, item.cantidad - 1);
    }
  }

  cantidadEnCarrito(id: number): number {
    const item = this.carrito.items().find(x => x.id === id);
    return item ? item.cantidad : 0;
  }
}