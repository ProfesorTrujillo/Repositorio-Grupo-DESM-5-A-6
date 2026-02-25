import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // 👈 importa esto
import { MenuService, Platillo } from '../../services/menu';
import { Car } from '../../services/car';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-menu',
  standalone: true, // 👈 asegúrate de que esté
  imports: [CommonModule, CurrencyPipe, RouterLink], // 👈 agrega aquí CommonModule y CurrencyPipe
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent {
  private readonly menuService = inject(MenuService);
  private readonly carrito = inject(Car);
  platillos: Platillo[] = this.menuService.getPlatillos();
  trackById = (_: number, p: Platillo) => p.id;

  mensajeExito = signal<string | null>(null); // Variable para controlar la alerta
  agregar(p: Platillo) {
    if (p.disponible) {
      this.carrito.agregar(p, 1);
      this.mensajeExito.set(`${p.nombre} agregado con éxito`);
      // Desaparecer la alerta después de 3 segundos
      setTimeout(() => {
        this.mensajeExito.set(null);
      }, 3000);
    }
  }
}