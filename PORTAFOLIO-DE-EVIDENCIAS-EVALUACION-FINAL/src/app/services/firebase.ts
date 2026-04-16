import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db = getFirestore();

  async agregarDocumento(nombreColeccion: string, datos: any) {
    const ref = collection(this.db, nombreColeccion);
    return await addDoc(ref, datos);
  }

  async obtenerDocumentos(nombreColeccion: string) {
    const ref = collection(this.db, nombreColeccion);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}