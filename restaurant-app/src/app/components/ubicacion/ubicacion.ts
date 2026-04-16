import { AfterViewInit, Component, OnDestroy, effect, inject, Input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GeolocalizacionService } from '../../services/geolocalización';
import { CarritoService } from '../../services/carService';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ubicacion.html',
  styleUrls: ['./ubicacion.css']
})
export class UbicacionComponent implements AfterViewInit, OnDestroy {

  @Input() compacto = false;

  geo = inject(GeolocalizacionService);
  carrito = inject(CarritoService);
  private platformId = inject(PLATFORM_ID);

  private L!: typeof import('leaflet');
  private mapa!: any;
  private mapaListo = false;

  private marcadorUsuario?: any;
  private marcadorRestaurante?: any;
  private linea?: any;

  // Efecto reactivo
  private reaccion = effect(() => {
    const u = this.geo.ubicacionUsuario();
    if (!this.mapaListo || !u || !this.L) return;

    this.colocarMarcadorUsuario(u.latitud, u.longitud);
    this.dibujarLinea();
    this.ajustarLimites();

    const d = this.geo.distanciaKm();
    if (d != null) {
      const envio = Math.min(Math.max(25, Math.round(d * 18)), 120);
      this.carrito.setEnvio(envio);
    }
  });

  async ngAfterViewInit(): Promise<void> {

    // 🚫 No ejecutar en servidor
    if (!isPlatformBrowser(this.platformId)) return;

    // ✅ Import dinámico solo en navegador
    this.L = await import('leaflet');
    const L = this.L;

    (L as any).Icon.Default.imagePath = 'assets/leaflet/';

    this.mapa = L.map('map').setView(
      [this.geo.restaurante.latitud, this.geo.restaurante.longitud],
      14
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.marcadorRestaurante = L
      .marker([this.geo.restaurante.latitud, this.geo.restaurante.longitud], { title: 'Restaurante' })
      .addTo(this.mapa)
      .bindPopup('Restaurante');

    this.geo.obtenerUbicacionUnaVez();
    this.geo.iniciarObservacion();

    setTimeout(() => this.mapa.invalidateSize(), 0);

    this.mapaListo = true;
  }

  ngOnDestroy(): void {
    this.geo.detenerObservacion();
    if (this.mapa) {
      this.mapa.remove();
    }
    this.marcadorUsuario = undefined;
    this.marcadorRestaurante = undefined;
    this.linea = undefined;
    this.mapaListo = false;
  }

  reintentarUbicacion(): void {
    this.geo.obtenerUbicacionUnaVez();
  }

  // === MÉTODOS PRIVADOS ===

  private colocarMarcadorUsuario(lat: number, lng: number): void {
    if (!this.mapa || !this.L) return;

    if (!this.marcadorUsuario) {
      this.marcadorUsuario = this.L.marker([lat, lng], { title: 'Tu ubicación' })
        .addTo(this.mapa)
        .bindPopup('Tu ubicación');
    } else {
      this.marcadorUsuario.setLatLng([lat, lng]);
    }
  }

  private dibujarLinea(): void {
    if (!this.marcadorRestaurante || !this.marcadorUsuario || !this.mapa || !this.L) return;

    const origen = this.marcadorRestaurante.getLatLng();
    const destino = this.marcadorUsuario.getLatLng();

    if (!this.linea) {
      this.linea = this.L.polyline([origen, destino], {
        color: '#0f766e',
        weight: 4,
        opacity: 0.85
      }).addTo(this.mapa);
    } else {
      this.linea.setLatLngs([origen, destino]);
    }
  }

  private ajustarLimites(): void {
    if (!this.marcadorRestaurante || !this.marcadorUsuario || !this.mapa || !this.L) return;

    const bounds = this.L.latLngBounds(
      this.marcadorRestaurante.getLatLng(),
      this.marcadorUsuario.getLatLng()
    );

    this.mapa.fitBounds(bounds, {
      padding: [48, 48],
      maxZoom: 16
    });
  }
}