import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Recuerda que tu archivo se llamaba app.ts
import { initializeApp } from "firebase/app";
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Inicializar Firebase
initializeApp(environment.firebaseConfig);

// Arrancar la app con las rutas habilitadas
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));