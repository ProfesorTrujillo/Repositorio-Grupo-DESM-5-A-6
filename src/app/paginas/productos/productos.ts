import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos';
import { Producto, CategoriaProducto } from '../../modelos/producto.model';
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
  
  estado: EstadoFormulario = EstadoFormulario.Inactivo;

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
  }

  async cargarProductos() {
    this.productos = await this.productosService.obtenerProductos();
  }

  editarProducto(prod: Producto) {
    this.producto = { ...prod };
    this.estado = EstadoFormulario.Editando;
  }

  async guardarProducto() {
    if (this.estado === EstadoFormulario.Inactivo) {
      window.alert('No hay ninguna operación activa.');
      return;
    }

    const confirmar = this.estado === EstadoFormulario.Editando
      ? window.confirm('¿Deseas ACTUALIZAR este producto?')
      : window.confirm('¿Deseas GUARDAR este producto?');

    if (!confirmar) return;

    if (this.estado === EstadoFormulario.Creando) {
      await this.productosService.crearProducto(this.producto);
      window.alert('Producto guardado correctamente');
      this.enviarCorreo(this.producto, 'Registro'); // <-- ¡AQUÍ!
    }

    if (this.estado === EstadoFormulario.Editando && this.producto.id) {
      await this.productosService.actualizarProducto(this.producto.id, this.producto);
      window.alert('Producto actualizado correctamente');
      this.enviarCorreo(this.producto, 'Actualización'); // <-- ¡Y AQUÍ!
    }

    this.estado = EstadoFormulario.Inactivo;
    this.resetFormulario();
    await this.cargarProductos(); 
  }

  async eliminarProducto(id?: string) {
    if (!id) return;
    const confirmar = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (!confirmar) return;
    await this.productosService.eliminarProducto(id);
    this.cargarProductos();
  }

  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;
    this.resetFormulario();
  }

  enviarCorreo(producto: Producto, accion: string) {
    emailjs.send(
      'service_2skx20k', // El que sacaste primero (ej. service_2skx20k)
      'template_ubnhj71', // El que sacaste de la plantilla (ej. template_...)
      {
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        accion 
      },
      'A9Oki-Hqp3EENyPMf' // El que está en la sección Account
    );
  }

  contactarPorWhatsapp(producto: Producto) {
    // Si quieres, cambia los ceros por tu número real para probarlo
    const mensaje = `Producto: ${producto.nombre}\nPrecio: $${producto.precio}\nCategoría: ${producto.categoria}`;
    const url = `https://wa.me/5210000000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  compartirFacebook(producto: Producto) {
    const texto = `Producto ${producto.nombre} disponible por $${producto.precio}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(texto)}`, '_blank');
  }

  compartirTwitter(producto: Producto) {
    const texto = `Producto ${producto.nombre} disponible por $${producto.precio}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`, '_blank');
  }
}