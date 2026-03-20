import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pago-exitoso',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './pago-exitoso.component.html',
    styleUrl: './pago-exitoso.component.css',
})
export class PagoExitosoComponent implements OnInit {
    total = 0;
    folio = '';
    fecha = '';

    constructor(private ruta: ActivatedRoute) { }

    ngOnInit(): void {
        // Leer folio y total enviados por el backend como query params
        const folioParam = this.ruta.snapshot.queryParamMap.get('folio');
        const totalParam = this.ruta.snapshot.queryParamMap.get('total');

        this.folio = folioParam ?? crypto.randomUUID();
        this.total = totalParam ? parseFloat(totalParam) : 0;
        this.fecha = new Date().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' });
    }
}
