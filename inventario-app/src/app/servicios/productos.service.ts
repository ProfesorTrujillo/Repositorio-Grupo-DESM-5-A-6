// src/app/servicios/productos.service.ts
import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private db = getFirestore();
  private nombreColeccion = 'productos';

  async crearProducto(producto: Producto): Promise<string> {
    const ref = collection(this.db, this.nombreColeccion);
    const docRef = await addDoc(ref, {
      ...producto,
      fechaCreacion: new Date().toISOString()
    });
    return docRef.id;
  }

  async obtenerProductos(): Promise<Producto[]> {
    const ref = collection(this.db, this.nombreColeccion);
    const q = query(ref, orderBy('fechaCreacion', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Producto, 'id'>)
    }));
  }

  async actualizarProducto(id: string, producto: Partial<Producto>) {
    const ref = doc(this.db, this.nombreColeccion, id);
    return await updateDoc(ref, { ...producto });
  }

  async eliminarProducto(id: string) {
    const ref = doc(this.db, this.nombreColeccion, id);
    return await deleteDoc(ref);
  }
}