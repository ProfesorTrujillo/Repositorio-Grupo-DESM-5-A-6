// src/app/paginas/productos/productos.component.ts
import emailjs from 'emailjs-com';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos.service';
import { Producto, CategoriaProducto } from '../../modelos/producto.model';

// DECLARAR EL ENUM ANTES DEL COMPONENTE
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
  
  // Variable de estado
  estado: EstadoFormulario = EstadoFormulario.Inactivo;
  
  // Para notificaciones locales
  mensajeNotificacion: string = '';
  tipoNotificacion: string = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.resetFormulario();
    this.cargarProductos();
  }

  productoVacio(): Producto {
    return {
      nombre: "",
      descripcion: "",  // ✅ CORREGIDO: antes decía "descripion"
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
    try {
      this.productos = await this.productosService.obtenerProductos();
      console.log('Productos cargados:', this.productos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      this.mostrarNotificacion('Error al cargar productos', 'error');
    }
  }

  editarProducto(prod: Producto) {
    this.producto = { ...prod };
    this.estado = EstadoFormulario.Editando;
    this.mostrarNotificacion('Editando producto...', 'info');
  }

  async guardarProducto() {
    // Validar estado
    if (this.estado === EstadoFormulario.Inactivo) {
      this.mostrarNotificacion('No hay ninguna operación activa', 'error');
      return;
    }

    // Validar datos
    if (!this.producto.nombre.trim()) {
      this.mostrarNotificacion('El nombre del producto es requerido', 'error');
      return;
    }

    if (this.producto.precio <= 0) {
      this.mostrarNotificacion('El precio debe ser mayor a 0', 'error');
      return;
    }

    // Confirmar según el estado
    const confirmar = this.estado === EstadoFormulario.Editando 
      ? confirm('¿Deseas ACTUALIZAR este producto?')
      : confirm('¿Deseas GUARDAR este producto?');

    if (!confirmar) return;

    try {
      if (this.estado === EstadoFormulario.Editando && this.producto.id) {
        const { id, ...productoActualizado } = this.producto;
        await this.productosService.actualizarProducto(this.producto.id, productoActualizado);
        this.mostrarNotificacion('✅ Producto actualizado correctamente', 'exito');
        await this.enviarCorreo(this.producto, 'Actualización');
      } else {
        await this.productosService.crearProducto(this.producto);
        this.mostrarNotificacion('✅ Producto guardado correctamente', 'exito');
        await this.enviarCorreo(this.producto, 'Registro');
      }
      
      this.estado = EstadoFormulario.Inactivo;
      this.resetFormulario();
      await this.cargarProductos();
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => this.limpiarNotificacion(), 3000);
      
    } catch (error) {
      console.error('Error al guardar:', error);
      this.mostrarNotificacion('❌ Error al guardar el producto', 'error');
    }
  }

  async eliminarProducto(id?: string) {
    if (!id) return;
    
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await this.productosService.eliminarProducto(id);
        this.mostrarNotificacion('🗑️ Producto eliminado correctamente', 'exito');
        await this.cargarProductos();
        setTimeout(() => this.limpiarNotificacion(), 3000);
      } catch (error) {
        console.error('Error al eliminar:', error);
        this.mostrarNotificacion('❌ Error al eliminar el producto', 'error');
      }
    }
  }

  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;
    this.resetFormulario();
    this.mostrarNotificacion('Operación cancelada', 'info');
    setTimeout(() => this.limpiarNotificacion(), 2000);
  }

  // NOTIFICACIONES LOCALES
  mostrarNotificacion(mensaje: string, tipo: string) {
    this.mensajeNotificacion = mensaje;
    this.tipoNotificacion = tipo;
  }

  limpiarNotificacion() {
    this.mensajeNotificacion = '';
    this.tipoNotificacion = '';
  }

 async enviarCorreo(producto: Producto, accion: string) {
  try {
    const templateParams = {
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      accion: accion,
      fecha: new Date().toLocaleString('es-MX')
    };

    const response = await emailjs.send(
      'service_96eax8d',      // Tu Service ID
      'template_rqk00qm',     // Tu Template ID
      templateParams,
      'aa47VvCnkV890je4y'     // Tu Public Key
    );
    
    console.log('✅ Correo enviado exitosamente', response);
    this.mostrarNotificacion(`📧 Correo enviado (${accion})`, 'exito');
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    this.mostrarNotificacion('⚠️ Error al enviar correo', 'error');
  }
}

  // ========== WHATSAPP ==========
  contactarPorWhatsapp(producto: Producto) {
    const mensaje = `Hola, estoy interesado en el producto:\n\n📦 Nombre: ${producto.nombre}\n💰 Precio: $${producto.precio}\n📂 Categoría: ${producto.categoria}\n📝 Descripción: ${producto.descripcion || 'Sin descripción'}`;
    const numeroTelefono = '4493983940'; 
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    this.mostrarNotificacion('📱 Abriendo WhatsApp...', 'info');
  }

  // ========== REDES SOCIALES ==========
  compartirFacebook(producto: Producto) {
    const url = window.location.href;
    const texto = `Mira este producto: ${producto.nombre} - $${producto.precio}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(texto)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    this.mostrarNotificacion('📘 Abriendo Facebook...', 'info');
  }

  compartirTwitter(producto: Producto) {
    const texto = `Producto: ${producto.nombre} - $${producto.precio} #InventarioApp #AWOS`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    this.mostrarNotificacion('🐦 Abriendo X (Twitter)...', 'info');
  }
}