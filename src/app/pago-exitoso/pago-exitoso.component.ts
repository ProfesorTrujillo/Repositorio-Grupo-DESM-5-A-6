import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [CommonModule], 
  template: `
    <div style="text-align:center; padding:50px;">
      <h1>Pago exitoso</h1>
      <p>Gracias por tu compra</p>

      <h3>Total pagado: {{ total | currency:'MXN' }}</h3>

      <p>Folio: {{ folio }}</p>
    </div>
  `
})
export class PagoExitosoComponent {
  folio = crypto.randomUUID();
  total = 0; 
}