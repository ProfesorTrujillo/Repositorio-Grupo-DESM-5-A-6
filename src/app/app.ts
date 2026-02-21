import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'restaurant-app';
}
