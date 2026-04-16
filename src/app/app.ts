<<<<<<< Updated upstream
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MenuComponent } from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('restaurant-app');
}
=======
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
 selector: 'app-root',
 standalone: true,
 imports: [RouterOutlet],
 template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}
>>>>>>> Stashed changes
