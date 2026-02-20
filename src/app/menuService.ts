import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  obtenerMenu() {
    return [
      'Tacos..................................$16c/u',
      'Enchiladas..................................$40',
      'Pozole..................................$100',
      'Quesadillas..................................$35c/u',
      'Pizza..................................$20c/u',
      'Hamburguesa..................................$65 ',
      'Sushi ..................................$180',
    ];
  }

}