import { Component } from '@angular/core';
import { Header } from './header/header';
import { Menu } from './menu/menu';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Menu, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
}
