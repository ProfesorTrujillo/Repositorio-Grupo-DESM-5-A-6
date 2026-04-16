import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';
 
initializeApp(environment.firebaseConfig);
 
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)  // 👈 esto faltaba
  ]
}).catch(err => console.error(err));