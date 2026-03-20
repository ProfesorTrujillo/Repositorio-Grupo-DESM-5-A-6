import { Component, inject } from '@angular/core';
import { viajes, viaje } from '../../services/package-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-package-list-componente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './package-list-componente.html',
  styleUrl: './package-list-componente.css',
})

export class PackageListComponent {
private readonly viajesService = inject(viajes);

viaje : viaje[] = this.viajesService.obtenerViajes();
viajeSeleccionado: viaje | null = null;

trackByViajeId(_: number, v: any): number {
  return v.id;
}

seleccionarViaje  (v: viaje) {
  this.viajeSeleccionado = v;
}

agregarReserva(v: viaje) {
  if (v.estado) {
}
}
}
