import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private db = getFirestore();
  private coleccion = 'productos';

  async crearProducto(producto: Producto) {
    const ref = collection(this.db, this.coleccion);
    return await addDoc(ref, producto);
  }

  async obtenerProductos(): Promise<Producto[]> {
    const ref = collection(this.db, this.coleccion);
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(docu => ({
      id: docu.id,
      ...(docu.data() as Producto)
    }));
  }

  async actualizarProducto(id: string, producto: Producto) {
    const ref = doc(this.db, this.coleccion, id);
    return await updateDoc(ref, { ...producto });
  }

  async eliminarProducto(id: string) {
    const ref = doc(this.db, this.coleccion, id);
    return await deleteDoc(ref);
  }
}