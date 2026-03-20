import { Component, OnInit, inject} from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car } from '../../services/car'; 

@Component({
  selector: 'app-pago-exitoso',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './pago-exitoso.html',
  styleUrl: './pago-exitoso.css',
})
export class PagoExitoso implements OnInit {
  private carrito = inject(Car);
  
  folio: string = '';
  totalPagado: number = 0;

  ngOnInit() {
    // 1. Recuperamos los datos guardados
    this.folio = localStorage.getItem('ultimo_folio') || 'S/N';
    this.totalPagado = Number(localStorage.getItem('ultimo_total')) || 0;

    // 2. IMPORTANTE: Vaciamos el carrito porque el pedido ya se pagó
    this.carrito.vaciar();
    
    // Opcional: Limpiar localstorage después de unos segundos
  }
}
