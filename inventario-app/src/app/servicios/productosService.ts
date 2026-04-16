import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private db = getFirestore();
  private nombreColeccion = 'productos';

  // ✅ Listener en tiempo real — reemplaza obtenerProductos()
  escucharProductos(): Observable<Producto[]> {
    return new Observable(observer => {
      const ref = collection(this.db, this.nombreColeccion);
      const unsub = onSnapshot(ref, snapshot => {
        const productos = snapshot.docs.map(docu => ({
          id: docu.id,
          ...(docu.data() as Producto)
        }));
        observer.next(productos);
      }, error => observer.error(error));

      return () => unsub(); // limpia el listener al destruir el componente
    });
  }

  async crearProducto(producto: Producto) {
    const ref = collection(this.db, this.nombreColeccion);
    return await addDoc(ref, producto);
  }

  async actualizarProducto(id: string, producto: Producto) {
    const ref = doc(this.db, this.nombreColeccion, id);
    return await updateDoc(ref, { ...producto });
  }

  async eliminarProducto(id: string) {
    const ref = doc(this.db, this.nombreColeccion, id);
    return await deleteDoc(ref);
  }
}