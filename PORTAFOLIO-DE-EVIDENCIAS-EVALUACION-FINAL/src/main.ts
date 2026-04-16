import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './app/firebase.config';

// Inicializar Firebase
initializeApp(firebaseConfig);

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});