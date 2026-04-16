// src/app/servicios/auth.service.ts
import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth();

  async registrarUsuario(correo: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, correo, password);
  }

  async iniciarSesion(correo: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, correo, password);
  }

  async cerrarSesion() {
    return await signOut(this.auth);
  }

  obtenerUsuarioActual(): User | null {
    return this.auth.currentUser;
  }
}