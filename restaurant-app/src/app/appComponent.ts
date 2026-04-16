import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/headerComponent';
import { FooterComponent } from './components/footer/footerComponent';
@Component({
selector: 'app-root',
standalone: true,
imports: [RouterLink, RouterOutlet, HeaderComponent, FooterComponent],
templateUrl: './app.html',
styleUrl: './app.css'
})
export class AppComponent {}