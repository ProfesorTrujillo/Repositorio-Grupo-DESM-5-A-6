import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  getPlatillos(): string[] {
    return ['Tacos', 
      'Burritos', 
      'Quesadillas', 
      'Enchiladas',
      'Chiles Rellenos',
      'Tamales',
      'Pozole',
      'Mole',
      'Chilaquiles',
      'Sopes'];
  }
}
