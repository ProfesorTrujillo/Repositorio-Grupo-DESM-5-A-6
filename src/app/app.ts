import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './app.html',      // ← era app.component.html
  styleUrl: './app.css'           // ← era app.component.css
})
export class App {}