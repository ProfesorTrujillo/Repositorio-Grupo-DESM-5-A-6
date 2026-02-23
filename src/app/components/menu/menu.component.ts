import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  categoria: string;
}

interface ItemCarrito extends MenuItem {
  cantidad: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  carritoAbierto = false;

  menu: MenuItem[] = [
    {
      nombre: 'Tacos de Birria',
      precio: 85,
      descripcion: 'Tacos de carne de res guisada con consomé, cebolla y cilantro.',
      imagen: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=300&fit=crop',
      categoria: 'Tacos'
    },
    {
      nombre: 'Pizza Margarita',
      precio: 120,
      descripcion: 'Pizza con salsa de tomate, mozzarella fresca y albahaca.',
      imagen: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=300&fit=crop',
      categoria: 'Pizzas'
    },
    {
      nombre: 'Hamburguesa Clásica',
      precio: 95,
      descripcion: 'Carne de res, lechuga, tomate, queso cheddar y aderezo especial.',
      imagen: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&h=300&fit=crop',
      categoria: 'Hamburguesas'
    },
    {
      nombre: 'Sopa de Lima',
      precio: 70,
      descripcion: 'Caldo de pollo con tiras de tortilla, lima y chile.',
      imagen: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=300&fit=crop',
      categoria: 'Sopas'
    },
    {
      nombre: 'Enchiladas Verdes',
      precio: 90,
      descripcion: 'Tortillas rellenas de pollo bañadas en salsa verde y crema.',
      imagen: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=600&h=300&fit=crop',
      categoria: 'Antojitos'
    },
    {
      nombre: 'Agua de Horchata',
      precio: 35,
      descripcion: 'Bebida fresca de arroz con canela y azúcar.',
      imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=300&fit=crop',
      categoria: 'Bebidas'
    }
  ];

  carrito: ItemCarrito[] = [];

  get totalItems(): number {
    return this.carrito.reduce((sum, i) => sum + i.cantidad, 0);
  }

  get totalPrecio(): number {
    return this.carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }

  cantidadEnCarrito(item: MenuItem): number {
    const encontrado = this.carrito.find(i => i.nombre === item.nombre);
    return encontrado ? encontrado.cantidad : 0;
  }

  agregarAlCarrito(item: MenuItem) {
    const encontrado = this.carrito.find(i => i.nombre === item.nombre);
    if (encontrado) {
      encontrado.cantidad++;
    } else {
      this.carrito.push({ ...item, cantidad: 1 });
    }
  }

  quitarDelCarrito(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.carrito = this.carrito.filter(i => i.nombre !== item.nombre);
    }
  }

  eliminarDelCarrito(item: ItemCarrito) {
    this.carrito = this.carrito.filter(i => i.nombre !== item.nombre);
  }

  abrirCarrito() {
    this.carritoAbierto = true;
  }

  cerrarCarrito() {
    this.carritoAbierto = false;
  }

  confirmarPedido() {
    alert(`¡Pedido confirmado! Total: $${this.totalPrecio}`);
    this.carrito = [];
    this.carritoAbierto = false;
  }
}