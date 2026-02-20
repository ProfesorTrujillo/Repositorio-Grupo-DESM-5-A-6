import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menu = this.menuService.getMenu();
  }
}