export enum CategoriaProducto {
 Electronica = 'Electrónica',
 Oficina = 'Oficina',
 Hogar = 'Hogar'
}
export interface Producto {
 id?: string; // ID generado por Firestore
 nombre: string;
 descripcion: string;
 precio: number;
 categoria: CategoriaProducto;
 fechaCreacion: string;
}
