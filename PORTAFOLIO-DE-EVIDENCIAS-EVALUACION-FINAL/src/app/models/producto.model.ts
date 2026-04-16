export enum CategoriaProducto {
  Electronica = 'Electrónica',
  Oficina = 'Oficina',
  Hogar = 'Hogar'
}

export interface Producto {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaProducto;
  fechaCreacion: string;
}