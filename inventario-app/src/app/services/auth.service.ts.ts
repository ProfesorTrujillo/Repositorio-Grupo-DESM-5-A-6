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
    try{
        return signInWithEmailAndPassword(this.auth, correo, password);
    }catch (error){
        throw error;
    }
}

cerrarSesion() {
return signOut(this.auth);
}

obtenerUsuarioActual(): User | null {
return this.auth.currentUser;
}
}