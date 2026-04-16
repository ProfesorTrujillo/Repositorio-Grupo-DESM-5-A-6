<<<<<<< Updated upstream
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
=======
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, getApps } from 'firebase/app';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDn6620Z-1Z6DJnoy2MuG7bU49wlkeC4q4",
  authDomain: "inventario-app-48bb7.firebaseapp.com",
  projectId: "inventario-app-48bb7",
  storageBucket: "inventario-app-48bb7.firebasestorage.app",
  messagingSenderId: "1041784387928",
  appId: "1:1041784387928:web:1dd29d24824fc246c1cd2d"
};

// Inicializamos Firebase globalmente solo si no ha sido inicializado antes
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
>>>>>>> Stashed changes
