import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { MenuComponent } from './components/menu/menu';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HeaderComponent, MenuComponent, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('restaurant-app');
}
