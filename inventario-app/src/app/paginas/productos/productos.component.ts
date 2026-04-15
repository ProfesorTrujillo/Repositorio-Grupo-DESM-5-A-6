import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Producto, CategoriaProducto } from '../../modelos/producto.modelo';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { Router } from '@angular/router';

enum EstadoFormulario {
  Creando = 'CREANDO',
  Editando = 'EDITANDO',
  Inactivo = 'INACTIVO'
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = this.productoVacio();
  categorias = Object.values(CategoriaProducto);

  estado: EstadoFormulario = EstadoFormulario.Inactivo;
  EstadoFormulario = EstadoFormulario; 

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resetFormulario();
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


  async cargarProductos() {
    try {
      const data = await this.productosService.obtenerProductos();
      this.productos = [...data];
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

async guardarProducto() {
  if (this.estado === EstadoFormulario.Inactivo) {
    Swal.fire({ icon: 'warning', title: '⚠️ Sin operación activa', text: 'No hay ninguna operación activa.', background: '#1a1b2e', color: '#fff' });
    return;
  }
  if (!this.producto.nombre.trim()) {
    Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'El nombre del producto es obligatorio.', background: '#1a1b2e', color: '#fff' });
    return;
  }
  if (this.producto.precio <= 0) {
    Swal.fire({ icon: 'warning', title: 'Precio inválido', text: 'El precio debe ser mayor a 0.', background: '#1a1b2e', color: '#fff' });
    return;
  }
  if (this.estado === EstadoFormulario.Creando) {
    const duplicado = this.productos.some(
      p => p.nombre.trim().toLowerCase() === this.producto.nombre.trim().toLowerCase()
    );
    if (duplicado) {
      Swal.fire({ icon: 'error', title: 'Duplicado', text: 'Ya existe un producto con ese nombre.', background: '#1a1b2e', color: '#fff' });
      return;
    }
  }

  const confirmar = await Swal.fire({
    title: this.estado === EstadoFormulario.Editando ? '¿Actualizar producto?' : '¿Guardar producto?',
    text: this.estado === EstadoFormulario.Editando ? '¿Deseas guardar los cambios?' : '¿Deseas registrar este producto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#00d2ff',
    cancelButtonColor: '#cf6679',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
    background: '#1a1b2e',
    color: '#fff'
  });

  if (!confirmar.isConfirmed) return;

  try {
    if (this.estado === EstadoFormulario.Creando) {
      await this.productosService.crearProducto(this.producto);
      this.enviarCorreo(this.producto, 'Registro');
      this.notificacion('¡Guardado!', 'Producto añadido al inventario', 'success');
    }
    if (this.estado === EstadoFormulario.Editando && this.producto.id) {
      await this.productosService.actualizarProducto(this.producto.id, this.producto);
      this.enviarCorreo(this.producto, 'Actualización');
      this.notificacion('¡Actualizado!', 'Producto modificado con éxito', 'success');
    }

    this.estado = EstadoFormulario.Inactivo;
    this.resetFormulario();
    await this.cargarProductos();

  } catch (error) {
    this.notificacion('Error', 'No se pudo procesar la operación', 'error');
  }
}

  editarProducto(producto: Producto) {
    this.producto = { ...producto };
    this.estado = EstadoFormulario.Editando;
    this.notificacion('Modo Edición', `Editando: ${producto.nombre}`, 'success');
  }

  async eliminarProducto(id?: string) {
    if (!id) return;

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00d2ff',
      cancelButtonColor: '#cf6679',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#0f0f1a',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      try {
        await this.productosService.eliminarProducto(id);
        this.notificacion('Eliminado', 'El producto ha sido borrado', 'success');
        await this.cargarProductos();
      } catch (error) {
        this.notificacion('Error', 'No se pudo eliminar el producto', 'error');
      }
    }
  }

  cancelar() {
    this.router.navigate(['/inicio']);
  }

  enviarCorreo(producto: Producto, accion: string) {
    emailjs.send(
      'service_gc1scfi', 
      'template_2o3v5vx', 
      {
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        accion
      },
      '4b3WOM53Tdtax56p6' 
    );
  }

  // PASO 9 — WhatsApp
  contactarPorWhatsapp(producto: Producto) {
    const mensaje = `Producto: ${producto.nombre}\nPrecio: ${producto.precio}\nCategoría: ${producto.categoria}`;
    const url = `https://wa.me/524494156917?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

compartirFacebook(producto: Producto) {
  const url = `http://localhost:4200/productos`;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
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


  productoVacio(): Producto {
    return {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: CategoriaProducto.Electronica,
      fechaCreacion: new Date().toISOString()
    };
  }

  private notificacion(titulo: string, mensaje: string, tipo: 'success' | 'error') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#1a1b2e',
      color: '#ffffff',
      icon: tipo,
      title: titulo,
      text: mensaje
    });
  }

  
}