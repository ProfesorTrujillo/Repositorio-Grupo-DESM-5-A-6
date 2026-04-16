import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private db = getFirestore();
  private nombreColeccion = 'productos';

  // Crear producto
  async crearProducto(producto: Producto) {
    const ref = collection(this.db, this.nombreColeccion);
    return await addDoc(ref, producto);
  }

  // Obtener productos
  async obtenerProductos(): Promise<Producto[]> {
    const ref = collection(this.db, this.nombreColeccion);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(docu => ({
      id: docu.id,
      ...(docu.data() as Producto)
    }));
  }

  // Actualizar
  async actualizarProducto(id: string, producto: Producto) {
    const ref = doc(this.db, this.nombreColeccion, id);
    return await updateDoc(ref, { ...producto });
  }

  // Eliminar
  async eliminarProducto(id: string) {
    const ref = doc(this.db, this.nombreColeccion, id);
    return await deleteDoc(ref);
  }
}
