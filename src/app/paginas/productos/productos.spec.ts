import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos';
import { ProductosService } from '../../servicios/productos';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent],
      providers: [
        {
          provide: ProductosService,
          useValue: {
            obtenerProductos: async () => [],
            crearProducto: async () => {},
            actualizarProducto: async () => {},
            eliminarProducto: async () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});