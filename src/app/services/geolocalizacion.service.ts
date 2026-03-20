import { Injectable, signal, computed } from '@angular/core';

export interface Coordenadas {
  latitud: number;
  longitud: number;
  precision?: number;
}

@Injectable({ providedIn: 'root' })
export class GeolocalizacionService {

  constructor() {
    this.obtenerUbicacion();
  }

  readonly restaurante: Coordenadas = {
    latitud: 21.924613639144443,
    longitud: -102.31541073945523
  };

  /*readonly restaurante: Coordenadas = {
    latitud: 21.87028311360229,
    longitud: -102.28179400405388
  };*/

  
  private readonly _ubicacionUsuario = signal<Coordenadas | null>(null);
  readonly ubicacionUsuario = this._ubicacionUsuario.asReadonly();

  private readonly _errorGeolocalizacion = signal<string | null>(null);
  readonly errorGeolocalizacion = this._errorGeolocalizacion.asReadonly();

  readonly distanciaKm = computed(() => {
    const u = this._ubicacionUsuario();
    if (!u) return null;

    const R = 6371;
    const aRad = (g: number) => g * Math.PI / 180;

    const dLat = aRad(this.restaurante.latitud - u.latitud);
    const dLng = aRad(this.restaurante.longitud - u.longitud);

    const lat1 = aRad(u.latitud);
    const lat2 = aRad(this.restaurante.latitud);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return +(R * c).toFixed(2);
  });

  async obtenerUbicacion(): Promise<void> {
    this._errorGeolocalizacion.set(null);

    if (!('geolocation' in navigator)) {
      this._errorGeolocalizacion.set('Geolocalización no soportada.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this._ubicacionUsuario.set({
          latitud: pos.coords.latitude,
          longitud: pos.coords.longitude,
          precision: pos.coords.accuracy
        });
      },
      (error) => {
        this._errorGeolocalizacion.set('No se pudo obtener la ubicación.');
      },
      { enableHighAccuracy: true }
    );
  }
}