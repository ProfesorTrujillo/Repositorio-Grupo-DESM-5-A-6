import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MenuService } from "../services/menu-service";
import { CarritoService } from '../services/carrito-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})

export class MenuComponent {
  private readonly menuService = inject(MenuService);
  private readonly carritoService = inject(CarritoService);

  toastMessage = signal<string | null>(null);

  platillos: { id: number, nombre: string, precio: number, disponible: boolean }[] = this.menuService.getPlatillos();

  trackById = (index: number, item: { id: number, nombre: string, precio: number, disponible: boolean }) => item.id;

  agregarAlCarrito(platillo: { id: number, nombre: string, precio: number, disponible: boolean }) {
    console.log('Agregado al carrito:', platillo);
    this.carritoService.agregar(platillo, 1);
    this.toastMessage.set(`✔ ${platillo.nombre} agregado correctamente`);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2500);
  }
}
