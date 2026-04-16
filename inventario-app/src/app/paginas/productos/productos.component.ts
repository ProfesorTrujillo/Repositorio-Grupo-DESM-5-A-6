import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import emailjs from 'emailjs-com';
import { ProductosService } from '../../servicios/productos.service';
import { Producto, CategoriaProducto } from '../../modelos/producto.model';

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
export class ProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  producto: Producto = this.productoVacio();
  categorias = Object.values(CategoriaProducto);
  EstadoFormulario = EstadoFormulario;

  estado: EstadoFormulario = EstadoFormulario.Inactivo;

  private suscripcion!: Subscription;

  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resetFormulario();
    this.suscripcion = this.productosService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = [...productos];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
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

  editarProducto(prod: Producto) {
    this.producto = { ...prod };
    this.estado = EstadoFormulario.Editando;
  }

  async guardarProducto() {
    if (this.estado === EstadoFormulario.Inactivo) {
      window.alert('⚠️ No hay ninguna operación activa.');
      return;
    }

    const confirmar = this.estado === EstadoFormulario.Editando
      ? window.confirm('¿Deseas ACTUALIZAR este producto?')
      : window.confirm('¿Deseas GUARDAR este producto?');

    if (!confirmar) return;

    if (this.estado === EstadoFormulario.Creando) {
      await this.productosService.crearProducto(this.producto);
      this.enviarCorreo(this.producto, 'Registro');
      window.alert('✅ Producto guardado correctamente');
    }

    if (this.estado === EstadoFormulario.Editando && this.producto.id) {
      await this.productosService.actualizarProducto(this.producto.id, this.producto);
      this.enviarCorreo(this.producto, 'Actualización');
      window.alert('✅ Producto actualizado correctamente');
    }

    this.estado = EstadoFormulario.Inactivo;
    this.resetFormulario();
  }

  async eliminarProducto(id?: string) {
    if (!id) return;
    const confirmar = window.confirm('¿Deseas ELIMINAR este producto?');
    if (!confirmar) return;
    await this.productosService.eliminarProducto(id);
  }

  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;
    this.resetFormulario();
  }

  // ← Sin recursión, solo envía el correo una vez
  enviarCorreo(producto: Producto, accion: string) {
    emailjs.send(
      'service_5d57c5w',    // ← reemplaza con tu Service ID real
      'template_b0ke289',   // ← reemplaza con tu Template ID real
      {
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        accion: accion
      },
      'ANb32KnT15Q6rM9El'     // ← reemplaza con tu Public Key real
    ).catch(err => console.error('EmailJS error:', err));
  }

  contactarPorWhatsapp(producto: Producto) {
    const mensaje = `Producto: ${producto.nombre}\nPrecio: ${producto.precio}\nCategoría: ${producto.categoria}\nDescripción: ${producto.descripcion}`;
    const url = `https://wa.me/523347880471?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  compartirFacebook(producto: Producto) {
    const texto = `Producto ${producto.nombre} disponible por ${producto.precio}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(texto)}`, '_blank');
  }

  compartirTwitter(producto: Producto) {
    const texto = `Producto ${producto.nombre} disponible por ${producto.precio}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`, '_blank');
  }
}