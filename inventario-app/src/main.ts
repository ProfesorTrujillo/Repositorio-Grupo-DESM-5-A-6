// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

// Inicializar Firebase con tu configuración
const app = initializeApp(environment.firebaseConfig);
console.log('Firebase inicializado correctamente');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error('Error:', err));