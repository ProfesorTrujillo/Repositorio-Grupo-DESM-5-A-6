import { Component, AfterViewInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { GeolocalizacionService } from '../services/geolocalizacion.service';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent implements AfterViewInit {

  geo = inject(GeolocalizacionService);
  carrito = inject(CarService);

  private mapa!: L.Map;
  private marcadorUsuario?: L.Marker;
  private marcadorRestaurante?: L.Marker;
  private linea?: L.Polyline;

  private reaccion = effect(() => {
    const u = this.geo.ubicacionUsuario();
    if (!u || !this.mapa) return;



    const restaurante: L.LatLngExpression = [
      this.geo.restaurante.latitud,
      this.geo.restaurante.longitud
    ];

    const usuario: L.LatLngExpression = [
      u.latitud,
      u.longitud
    ];

    if (!this.marcadorUsuario) {
      this.marcadorUsuario = L.marker(usuario)
        .addTo(this.mapa)
        .bindPopup('Tu ubicación');
    } else {
      this.marcadorUsuario.setLatLng(usuario);
    }

    if (!this.linea) {
      this.linea = L.polyline([restaurante, usuario], {
        color: '#320c9a',
        weight: 5,
        opacity: 0.9
      }).addTo(this.mapa);
    } else {
      this.linea.setLatLngs([restaurante, usuario]);
    }

    const bounds = L.latLngBounds(restaurante, usuario);
    this.mapa.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
  });

  ngAfterViewInit(): void {

    (L as any).Icon.Default.imagePath = 'assets/leaflet/';

    this.mapa = L.map('map').setView(
      [this.geo.restaurante.latitud, this.geo.restaurante.longitud],
      14
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.marcadorRestaurante = L.marker([
      this.geo.restaurante.latitud,
      this.geo.restaurante.longitud
    ])
      .addTo(this.mapa)
      .bindPopup('Restaurante');

    this.geo.obtenerUbicacion();
  }
}