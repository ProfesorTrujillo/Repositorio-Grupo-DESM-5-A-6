import { Component, Input } from '@angular/core';
import { TravelPackage } from '../../services/package.spec';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './package-detail.html',
  styleUrls: ['./package-detail.css']
})
export class PackageDetailComponent {
  @Input() selectedPackage?: TravelPackage;
  
  
  reservationData = { name: '', email: '', travelers: 1 };
  reservationSuccess = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.reservationSuccess = true;
     
      setTimeout(() => {
        this.reservationSuccess = false;
        form.resetForm();
      }, 3000);
    }
  }
}
