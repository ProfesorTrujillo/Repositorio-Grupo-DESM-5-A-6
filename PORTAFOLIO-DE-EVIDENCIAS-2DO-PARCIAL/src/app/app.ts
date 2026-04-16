import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { HeaderComponent } from "./header-component/header-component";
import { FooterComponent } from "./footer-component/footer-component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router) {}
  protected readonly title = signal('restaurant-app');
}
