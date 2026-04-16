import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos';
// @ts-ignore
import emailjs from 'emailjs-com';
  import Swal from 'sweetalert2';

export enum EstadoFormulario {
  Creando = 'Creando',
  Editando = 'Editando',
  Inactivo = 'Inactivo'
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  categorias: string[] = ['Electrónica', 'Ropa', 'Hogar', 'Alimentos', 'Otros'];
  
  // Modelo inicial del producto
  producto: any = { nombre: '', descripcion: '', precio: null, categoria: this.categorias[0] };
  editando: boolean = false;
  estado: EstadoFormulario = EstadoFormulario.Inactivo;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  async cargarProductos() {
    this.productos = await this.productosService.obtenerProductos();
  }

  resetFormulario() {
    this.producto = { nombre: '', descripcion: '', precio: null, categoria: this.categorias[0] };
    this.estado = EstadoFormulario.Creando;
    this.editando = false;
  }

  async guardarProducto() {
    if (this.estado === EstadoFormulario.Inactivo && !this.editando) {
      this.estado = EstadoFormulario.Creando;
    }

    const confirmado = window.confirm('¿Estás seguro de que deseas guardar este producto?');
    if (!confirmado) return;

    try {
      if (this.estado === EstadoFormulario.Editando || this.editando) {
        await this.productosService.actualizarProducto(this.producto.id, this.producto);
        this.enviarCorreo(this.producto, 'actualizado');
      } else {
        await this.productosService.crearProducto(this.producto);
        this.enviarCorreo(this.producto, 'creado');
      }
      this.cancelar();
      this.cargarProductos();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  }

  editarProducto(p: any) {
    this.producto = { ...p }; // Clonamos el objeto para no editar directamente la lista hasta guardar
    this.estado = EstadoFormulario.Editando;
    this.editando = true;
  }

  async eliminarProducto(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await this.productosService.eliminarProducto(id);
      this.cargarProductos();
    }
  }

  cancelar() {
    this.producto = { nombre: '', descripcion: '', precio: null, categoria: this.categorias[0] };
    this.estado = EstadoFormulario.Inactivo;
    this.editando = false;
  }

  // --- INTEGRACIÓN DE APIS EXTERNAS ---

  enviarCorreo(producto: any, accion: string) {
    const templateParams = {
      producto_nombre: producto.nombre,
      producto_precio: producto.precio,
      accion: accion
    };

    emailjs.send('service_u92h9vu', 'template_m2iun7l', templateParams, '-0l3GNJwwN_h1gsO3')
      .then((response: any) => {
        console.log('Correo enviado con éxito!', response.status, response.text);
        Swal.fire({
          title: '¡Notificación enviada!',
          text: `Se ha notificado por correo que el producto fue ${accion} correctamente.`,
          icon: 'success',
          confirmButtonText: 'Genial'
        });
      }, (error: any) => {
        console.error('Error al enviar el correo:', error);
        Swal.fire({
          title: 'Error',
          text: 'El producto se guardó, pero hubo un problema al enviar el correo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  contactarPorWhatsapp(producto: any) {
    // Se quitó el espacio y se agregó el código de país (52 para México)
    const telefono = '524494927688'; 
    const mensaje = `Hola, me interesa el producto ${producto.nombre} con un precio de $${producto.precio}.`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  compartirFacebook(producto: any) {
    const urlACompartir = 'https://tudominio.com'; 
    const quote = `Mira este producto: ${producto.nombre} por $${producto.precio}.`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlACompartir)}&quote=${encodeURIComponent(quote)}`;
    window.open(url, '_blank');
  }

  compartirTwitter(producto: any) {
    const mensaje = `¡Mira este increíble producto! ${producto.nombre} por solo $${producto.precio}.`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }
}