import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../servicios/productosService';
import { Producto, CategoriaProducto } from '../../modelos/producto.model';
import { Subscription } from 'rxjs';
import emailjs from 'emailjs-com';

// Enum de control de estado del formulario
enum EstadoFormulario {
  Creando  = 'CREANDO',
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
export class ProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  producto: Producto = this.productoVacio();
  categorias = Object.values(CategoriaProducto);

  // Variable de estado
  estado: EstadoFormulario = EstadoFormulario.Inactivo;

  // Exponemos el enum al template
  EstadoFormulario = EstadoFormulario;

  private sub!: Subscription;

  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  // Inicializar
  ngOnInit(): void {
    this.resetFormulario();
    this.sub = this.productosService
      .escucharProductos()
      .subscribe(productos => {
        this.productos = productos;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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

  // Reset vuelve a modo Creando
  resetFormulario() {
    this.producto = this.productoVacio();
    this.estado = EstadoFormulario.Creando;
    this.cdr.detectChanges();
  }

  // Editar entra en modo Editando
  editarProducto(prod: Producto) {
    this.producto = { ...prod };
    this.estado = EstadoFormulario.Editando;
    this.cdr.detectChanges();
  }

  // Guardar usa el estado para decidir la acción
  async guardarProducto() {
    if (this.estado === EstadoFormulario.Inactivo) {
      window.alert('⚠️ No hay ninguna operación activa.');
      return;
    }

    if (!this.producto.nombre.trim()) {
      window.alert('⚠️ El nombre del producto es obligatorio.');
      return;
    }

    const confirmar = this.estado === EstadoFormulario.Editando
      ? window.confirm('¿Deseas ACTUALIZAR este producto?')
      : window.confirm('¿Deseas GUARDAR este producto?');

    if (!confirmar) return;

    if (this.estado === EstadoFormulario.Creando) {
      await this.productosService.crearProducto(this.producto);
      this.enviarCorreo(this.producto, 'Registro');     // ✅ PASO 8.4
      window.alert('✅ Producto guardado correctamente');
    }

    if (this.estado === EstadoFormulario.Editando && this.producto.id) {
      await this.productosService.actualizarProducto(this.producto.id, this.producto);
      this.enviarCorreo(this.producto, 'Actualización'); // ✅ PASO 8.4
      window.alert('✅ Producto actualizado correctamente');
    }

    this.estado = EstadoFormulario.Inactivo;
    this.resetFormulario();
    this.cdr.detectChanges();
  }

  // Cancelar regresa a estado seguro y navega a inicio
  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;
    this.resetFormulario();
    this.router.navigate(['/inicio']);
  }

  async eliminarProducto(id?: string) {
    if (!id) return;
    const confirmar = window.confirm('¿Deseas ELIMINAR este producto?');
    if (!confirmar) return;
    await this.productosService.eliminarProducto(id);
    this.cdr.detectChanges();
  }

  // EmailJS
  enviarCorreo(producto: Producto, accion: string) {
  emailjs.send(
    'service_vcm2lpr',   // de Email Services
    'template_hkyel98',  // de Settings de la plantilla
    {
      nombre:    producto.nombre,
      precio:    producto.precio,
      categoria: producto.categoria,
      accion
    },
    'jj4cuuokkV2vyziEm'    // de Account → General
  );
}
  // WhatsApp
  contactarPorWhatsapp(producto: Producto) {
    const mensaje = `Producto: ${producto.nombre}\nPrecio: ${producto.precio}\nCategoría: ${producto.categoria}\nDescripción: ${producto.descripcion}`;
    const url = `https://wa.me/524495986707?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  // Redes sociales
  compartirFacebook(producto: Producto) {
  // Facebook Sharer necesita una URL, usamos la de tu app local
  const urlApp = `http://localhost:4200`;
  const texto = `Producto: ${producto.nombre} - Precio: $${producto.precio} - Categoría: ${producto.categoria} - Descripción: ${producto.descripcion}`;
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlApp)}&quote=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

  compartirTwitter(producto: Producto) {
  const texto = `🛒 Producto: ${producto.nombre} | 💰 Precio: $${producto.precio} | 📦 Categoría: ${producto.categoria} | 📝 Descripción: ${producto.descripcion}`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`,
    '_blank'
  );
}
}