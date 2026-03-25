import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { Platillo, Platillos } from '../../services/menu-service';
import { CarritoService } from '../../services/carrito-service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-component.html',
  styleUrls: ['./menu-component.css']
})

export class menuComponent {
private readonly platillos = inject(Platillos);
private readonly carrito = inject(CarritoService);


platillo: Platillo[] = this.platillos.obtenerPlatillos();
platilloSeleccionado: Platillo | null = null;

trackByPlatilloId(_: number, p: Platillo): number {
  return p.id;
}

seleccionarLibro(p: Platillo) {
  this.platilloSeleccionado = p;
}

agregarAlCarrito(p: Platillo) {
  if (p.disponibilidad) {
    this.carrito.agregar(p, 1);
}
}
}
