import { Component } from '@angular/core';

@Component({
  selector: 'app-pago-cancelado',
  standalone: true,
  template: `
    <div style="text-align:center; padding:50px;">
      <h1>Pago cancelado</h1>
      <p>Tu pago no se completó</p>
    </div>
  `
})
export class PagoCanceladoComponent {}