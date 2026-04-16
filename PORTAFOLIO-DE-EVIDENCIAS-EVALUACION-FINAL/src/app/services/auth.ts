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

  registrarUsuario(correo: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  iniciarSesion(correo: string, password: string) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  cerrarSesion() {
    return signOut(this.auth);
  }

  obtenerUsuarioActual(): User | null {
    return this.auth.currentUser;
  }
}