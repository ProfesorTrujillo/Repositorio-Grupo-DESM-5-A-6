import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos';
import { Producto, CategoriaProducto } from '../../modelos/producto.model';
import emailjs from '@emailjs/browser';

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

  estado: EstadoFormulario = EstadoFormulario.Inactivo;

  productos: Producto[] = [];

  producto: Producto = this.productoVacio();

  editando: boolean = false;

  categorias = Object.values(CategoriaProducto);

  constructor(private productosService: ProductosService) {}

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

  resetFormulario() {
    this.producto = this.productoVacio();
    this.estado = EstadoFormulario.Creando;
    this.editando = false;
  }

  async cargarProductos() {
    this.productos = await this.productosService.obtenerProductos();
  }

  async guardarProducto() {

    if (this.estado === EstadoFormulario.Inactivo) {
      window.alert(' No hay operación activa');
      return;
    }

    const confirmar =
      this.estado === EstadoFormulario.Editando
        ? window.confirm('¿Deseas actualizar este producto?')
        : window.confirm('¿Deseas guardar este producto?');

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
    this.editando = true;
  }

  async eliminarProducto(id?: string) {
    if (!id) return;

    await this.productosService.eliminarProducto(id);
    await this.cargarProductos();
  }

  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;

    this.resetFormulario();
  }

  enviarCorreo(producto: Producto, accion: string) {
    emailjs.send(
      'service_kffzzms',
      'template_p9g0et5',
      {
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        accion: accion
      },
      'Ful69moOWJV62HCBI'
    );
  }

  contactarPorWhatsapp(producto: Producto) {
    const mensaje =
      `Producto: ${producto.nombre}
Precio: ${producto.precio}
Categoría: ${producto.categoria}`;

    const url = `https://wa.me/529531726120?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }

  compartirFacebook(producto: Producto) {
    const texto = `Producto ${producto.nombre} disponible por ${producto.precio}`;

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(texto)}`,
      '_blank'
    );
  }

  compartirTwitter(producto: Producto) {
    const texto = `Producto ${producto.nombre} disponible por ${producto.precio}`;

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`,
      '_blank'
    );
  }
}