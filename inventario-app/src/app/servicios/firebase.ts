import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

@Injectable({
providedIn: 'root'
})

export class FirebaseService {
private db = getFirestore();
// Agregar documento
async agregarDocumento(nombreColeccion: string, datos: any) {
const referencia = collection(this.db, nombreColeccion);
return await addDoc(referencia, datos);
}
// Obtener documentos
async obtenerDocumentos(nombreColeccion: string) {
const referencia = collection(this.db, nombreColeccion);
const snapshot = await getDocs(referencia);
return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
}
