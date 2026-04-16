import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firestore = getFirestore(getApp());

  async agregarDocumento(nombreColeccion: string, datos: any) {
    const referencia = collection(this.firestore, nombreColeccion);
    return await addDoc(referencia, datos);
  }

  async obtenerDocumentos(nombreColeccion: string) {
    const referencia = collection(this.firestore, nombreColeccion);
    const snapshot = await getDocs(referencia);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}