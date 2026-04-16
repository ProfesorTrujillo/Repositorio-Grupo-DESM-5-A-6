import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { getApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, doc,
  updateDoc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import { Producto } from '../modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private db = getFirestore(getApp());
  private nombreColeccion = 'productos';

  constructor(private ngZone: NgZone) {} // ← inyecta NgZone

  obtenerProductos(): Observable<Producto[]> {
    return new Observable(observer => {
      const ref = collection(this.db, this.nombreColeccion);
      const unsubscribe = onSnapshot(ref, snapshot => {

        // ← envuelve en ngZone.run() para que Angular detecte el cambio
        this.ngZone.run(() => {
          const productos = snapshot.docs.map(docu => ({
            id: docu.id,
            ...(docu.data() as Producto)
          }));
          observer.next(productos);
        });

      }, error => {
        this.ngZone.run(() => observer.error(error));
      });

      return () => unsubscribe();
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