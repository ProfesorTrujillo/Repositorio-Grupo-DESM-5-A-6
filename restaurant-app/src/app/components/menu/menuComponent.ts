import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MenuService, Platillo } from '../../services/menuService';
import { CarritoService } from '../../services/carService';
import { RouterLink } from '@angular/router';
@Component({
selector: 'app-menu',
standalone: true,
imports: [CommonModule, CurrencyPipe, RouterLink], // *ngFor/*ngIf + pipe de moneda
templateUrl: './menu.html',
styleUrl: './menu.css'
})

export class MenuComponent {
private readonly menuService = inject(MenuService);
private readonly carrito = inject(CarritoService);
platillos: Platillo[] = this.menuService.obtenerMenu();
trackById = (_: number, p: Platillo) => p.id;
agregar(p: Platillo) {
if (p.disponible) {
this.carrito.agregar(p, 1);
}
}
}