import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule], // Necesario para usar *ngFor
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  listaPlatillos: any[] = [];
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.listaPlatillos = this.menuService.getMenu();
  }
}