import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase.config'; // ← aquí el cambio

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  async agregarDocumento(nombreColeccion: string, datos: any) {
    const ref = collection(db, nombreColeccion);
    return await addDoc(ref, datos);
  }

  async obtenerDocumentos(nombreColeccion: string) {
    const ref = collection(db, nombreColeccion);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}