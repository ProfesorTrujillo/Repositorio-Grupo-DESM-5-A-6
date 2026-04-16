import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  template: `
    <h1>✅ Pago exitoso</h1>
    <p>Total pagado: {{ total }}</p>
    <p>Folio: {{ folio }}</p>
  `
})
export class PagoExitosoComponent {
  route = inject(ActivatedRoute);

  folio = this.route.snapshot.queryParamMap.get('folio');
  total = this.route.snapshot.queryParamMap.get('total');
}