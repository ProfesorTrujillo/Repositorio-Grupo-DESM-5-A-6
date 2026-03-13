import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { viajes, viaje } from '../../services/package-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-package-detail-componente',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './package-detail-componente.html',
  styleUrl: './package-detail-componente.css',
})
export class PackageDetailComponente implements OnInit{
  private readonly viajes = inject(viajes);
  private readonly route = inject(ActivatedRoute);

  viaje: viaje | null = null;
  mensajeReserva: string | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.viaje = this.viajes.obtenerViajes().find(v => v.id === id) ?? null;
  }

  reservarViaje() {
    if (this.viaje && this.viaje.estado) {
      this.viajes.agregarViaje(this.viaje);

      this.mensajeReserva = `¡Reserva exitosa para ${this.viaje.nombre}!`;

      setTimeout(() => {
        this.mensajeReserva = null;
      }, 3000);
    }
  }

  datosReserva = {
    nombreCliente: '',
    correo: '',
    cantidadPersonas: 1
  };

  mostrarFormulario: boolean = false;

  abrirFormulario() {
    if (this.viaje?.estado) {
      this.mostrarFormulario = true;
    }
  }

  confirmarReserva() {
    if (this.viaje) {
      this.viajes.agregarViaje(this.viaje);
      this.mensajeReserva = `¡Gracias ${this.datosReserva.nombreCliente}! Reserva confirmada para ${this.viaje.nombre}.`;
      
      this.mostrarFormulario = false;
      
      setTimeout(() => {
        this.mensajeReserva = null;
      }, 4000);
    
    }
  }
  activarFormulario(){
      this.mostrarFormulario = true;
      this.mensajeReserva = null;
    }
}
