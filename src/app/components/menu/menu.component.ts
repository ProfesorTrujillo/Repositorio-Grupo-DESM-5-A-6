import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService, Platillo } from '../../menu/menu.service';
import { CarritoService } from '../../services/car.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private readonly menuService = inject(MenuService);
  private readonly carrito     = inject(CarritoService);

  // Todos los platillos del servicio
  platillos: Platillo[] = this.menuService.obtenerPlatillos();

  // Categorías únicas para filtrar
  categorias: string[]  = this.menuService.getCategorias();
  categoriaActiva       = this.categorias[0] ?? '';
  platillosFiltrados: Platillo[] = this.menuService.getPorCategoria(this.categoriaActiva);

  trackById = (_: number, p: Platillo) => p.id;

  filtrar(categoria: string): void {
    this.categoriaActiva    = categoria;
    this.platillosFiltrados = this.menuService.getPorCategoria(categoria);
  }

  agregar(p: Platillo): void {
    if (p.disponible) {
      this.carrito.agregar(p, 1);
    }
  }

  /** Número de ítems en el carrito para la insignia */
  get totalItems(): number {
    return this.carrito.items().reduce((acc, it) => acc + it.cantidad, 0);
  }
}