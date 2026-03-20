// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  platillos: any[] = [];

  constructor(private menuServices: MenuService) {}

  ngOnInit(): void {
    this.platillos = this.menuServices.getMenu();
  }
}