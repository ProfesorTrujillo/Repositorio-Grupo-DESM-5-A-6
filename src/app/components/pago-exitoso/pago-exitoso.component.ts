import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PagoService } from '../../services/pago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pago-exitoso.component.html'
})
export class PagoExitosoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pagoService = inject(PagoService);

  folio = '';
  total = 0;
  fecha = '';
  mensaje = 'Procesando confirmación...';

  ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    console.log('🔍 Session ID recibido:', sessionId);   // ← para debug

    if (!sessionId) {
      this.mensaje = ' No se recibió ID de sesión';
      return;
    }

    this.pagoService.confirmarPedido(sessionId).subscribe({
      next: (res) => {
        console.log('Pedido guardado en JSON:', res);
        this.folio = res.folio;
        this.total = res.order.total;
        this.fecha = res.order.fecha;
        this.mensaje = '¡Pago confirmado y guardado!';
      },
      error: (err) => {
        console.error(' Error en confirmación:', err);
        this.mensaje = 'Error al guardar el pedido (revisa la consola)';
      }
    });
  }
}