import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService, Platillo } from './menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {

  categorias: string[] = [];
  categoriaActiva: string = '';
  platillosFiltrados: Platillo[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.categorias = this.menuService.getCategorias();
    this.categoriaActiva = this.categorias[0];
    this.filtrar(this.categoriaActiva);
  }

  filtrar(categoria: string): void {
    this.categoriaActiva = categoria;
    this.platillosFiltrados = this.menuService.getPorCategoria(categoria);
  }
}