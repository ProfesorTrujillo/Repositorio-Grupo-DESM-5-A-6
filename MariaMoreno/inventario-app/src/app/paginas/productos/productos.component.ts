import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../servicios/productos.service';
import { Producto, CategoriaProducto } from '../../modelos/producto.model';
import { Router } from '@angular/router';
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
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  producto: Producto = this.productoVacio();
  estado: EstadoFormulario = EstadoFormulario.Inactivo;
  categorias = Object.values(CategoriaProducto);

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

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

  async guardarProducto() {

    if (this.estado === EstadoFormulario.Inactivo) {
      alert("⚠ No hay operación activa");
      return;
    }

    const confirmar = this.estado === EstadoFormulario.Editando
      ? confirm("¿Actualizar producto?")
      : confirm("¿Guardar nuevo producto?");

    if (!confirmar) return;

    if (this.estado === EstadoFormulario.Creando) {
      await this.productosService.crearProducto(this.producto);
      alert("Producto guardado ✔");
      this.enviarCorreo(this.producto, 'Registro');
    }

    if (this.estado === EstadoFormulario.Editando && this.producto.id) {
      await this.productosService.actualizarProducto(this.producto.id, this.producto);
      alert("Producto actualizado ✔");
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
    if (!confirm("¿Eliminar producto?")) return;

    await this.productosService.eliminarProducto(id);
    alert("Producto eliminado ✔");

    this.cargarProductos();
  }

  cancelar() {
    if (this.estado === EstadoFormulario.Inactivo) return;
    this.resetFormulario();
  }

  // APIS DE COMUNICACIÓN

  enviarCorreo(producto: Producto, accion: string) {
    const templateParams = {
      accion: accion,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria
    };

    emailjs.send(
      'service_elal95o',
      'template_1qci5bq',
      templateParams,
      'P_wxBzvdw5n7SvvmP'
    )
    .then(
      (response) => {
        console.log('Correo enviado!', response.status, response.text);
        alert('Correo enviado correctamente ✔');
      },
      (error) => {
        console.error('Error al enviar correo', error);
        alert('Hubo un error al enviar el correo ');
      }
    );
  }

  contactarWhatsapp(producto: Producto) {
    const msg = `Hola, estoy interesado en el siguiente producto:
Producto: ${producto.nombre}
Precio: ${producto.precio}
Categoría: ${producto.categoria}`;

    const url = `https://wa.me/5214493455302?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  compartirFacebook(producto: Producto) {
    const texto = `Mira este producto: ${producto.nombre} por $${producto.precio}`;
    const urlProducto = 'https://google.com';

    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlProducto)}&quote=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }


  irInicio() {
    this.router.navigate(['/inicio']);
  }
}