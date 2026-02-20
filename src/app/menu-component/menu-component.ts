import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MenuService } from "../menu-service";

@Component({
  selector: 'app-menu-component',
  imports: [NgFor],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent implements OnInit {
  platillos: string[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.platillos = this.menuService.getPlatillos();
  }
}
