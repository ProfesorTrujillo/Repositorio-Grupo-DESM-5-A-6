import { Injectable } from '@angular/core';

export interface TravelPackage {
  id: number;
  destination: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packages: TravelPackage[] = [
    { id: 1, destination: 'Puerto Vallarta', price: 2000, description: 'Hotel y todo pagado x cabeza.' },
    { id: 2, destination: 'Puerto Rico', price: 5000, description: 'Viaje que proporciona felicidad por persona.' },
    { id: 3, destination: 'Guayabitos', price: 3000, description: 'Donde nada y nadie puede faltar.' }
  ];

  getPackages(): TravelPackage[] {
    return this.packages;
  }
}