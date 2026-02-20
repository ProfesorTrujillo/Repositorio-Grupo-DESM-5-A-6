import { Component } from '@angular/core';
import { HeaderComponent } from './header/headerComponent';
import { MenuComponent } from './menu/menuComponent';
import { FooterComponent } from './footer/footerComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}