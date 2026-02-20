import { Component } from '@angular/core';
import { MenuService } from '../menuService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {

  platillos: string[] = [];

  constructor(private menuService: MenuService) {
    this.platillos = this.menuService.obtenerMenu();
  }

}