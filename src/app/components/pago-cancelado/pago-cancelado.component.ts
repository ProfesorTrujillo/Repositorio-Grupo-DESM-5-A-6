import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-cancelado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pago-cancelado.component.html'
})
export class PagoCanceladoComponent {}