import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Producto, CategoriaProducto } from '../../models/producto.model';
import emailjs from 'emailjs-com';

enum EstadoFormulario {
  Creando = 'CREANDO',
  Editando = 'EDITANDO',
  Inactivo = 'INACTIVO'
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  producto: Producto = this.productoVacio();
  categorias = Object.values(CategoriaProducto);
  estado: EstadoFormulario = EstadoFormulario.Creando;

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.resetFormulario();
    this.cargarProductos();
  }

  productoVacio(): Producto {
    return {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: CategoriaProducto.Electronica,
      fechaCreacion: new Date().toISOString()
    };
  }

  async cargarProductos() {
    this.productos = await this.productosService.obtenerProductos();
  }

  async guardarProducto() {

    if (this.estado === EstadoFormulario.Inactivo) {
      window.alert('⚠️ No hay ninguna operación activa.');
      return;
    }

    const confirmar =
      this.estado === EstadoFormulario.Editando
        ? window.confirm('¿Deseas ACTUALIZAR este producto?')
        : window.confirm('¿Deseas GUARDAR este producto?');

    if (!confirmar) return;

    if (this.estado === EstadoFormulario.Creando) {
      await this.productosService.crearProducto(this.producto);
      window.alert('Producto guardado correctamente');

      this.enviarCorreo(this.producto, 'Registro');
    }

    if (this.estado === EstadoFormulario.Editando && this.producto.id) {
      await this.productosService.actualizarProducto(this.producto.id, this.producto);
      window.alert('Producto actualizado correctamente');

      this.enviarCorreo(this.producto, 'Actualización');
    }

    this.estado = EstadoFormulario.Inactivo;
    this.resetFormulario();
    await this.cargarProductos();
  }

  editarProducto(prod: Producto) {
    this.producto = { ...prod };
    this.estado = EstadoFormulario.Editando;
  }

  async eliminarProducto(id?: string) {
    if (!id) return;
    await this.productosService.eliminarProducto(id);
    this.cargarProductos();
  }

  resetFormulario() {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: CategoriaProducto.Electronica,
      fechaCreacion: new Date().toISOString()
    };

    this.estado = EstadoFormulario.Creando;
  }

  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;

    this.resetFormulario();
    this.estado = EstadoFormulario.Inactivo;
  }

  enviarCorreo(producto: any, accion: string) {
    emailjs.send(
      'service_ynrckjt',
      'template_v6vcuzh',
      {
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        accion: accion
      },
      'pOwU8kUY9jCZWd5E0'
    );
  }
  contactarPorWhatsapp(producto: any) {
    const mensaje = `
      Producto: ${producto.nombre}
      Precio: ${producto.precio}
      Categoría: ${producto.categoria}
      `;

    const url = `https://wa.me/521XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
  compartirFacebook(producto: any) {
    const texto = `Producto ${producto.nombre} disponible por ${producto.precio}`;

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(texto)}`,
      '_blank'
    );
  }

  compartirTwitter(producto: any) {
    const texto = `Producto ${producto.nombre} disponible por ${producto.precio}`;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`,
      '_blank'
    );
  }
}