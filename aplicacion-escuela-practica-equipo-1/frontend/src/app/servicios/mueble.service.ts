import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { Mueble } from '../modelos/mueble';
import { NotificacionService } from './notificacion.service';

@Injectable({
  providedIn: 'root',
})
export class MuebleService {
  //Para que angular pueda pedir o mandar los datos
  private myAppUrl: string = 'http://localhost:3001';
  private myApiUrl: string = '/api/muebles';

  private cacheMuebles: Mueble[] | null = null;
  private cacheInactivos: Mueble[] | null = null;
  private cacheEstadisticas: any[] | null = null;

  constructor(private http: HttpClient, private _notificacionService: NotificacionService){}

    //Obtener todos los muebles
    getMuebles(): Observable<Mueble[]>{

      if(this.cacheMuebles){
        return of(this.cacheMuebles);
      }

      return this.http.get<Mueble[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
        tap(data => {
          this.cacheMuebles = data;
          console.log('Muebles cargados del API', data.length);
        }),          
        catchError(err => {
        console.log('Status:', err.status);
        console.log('URL llamada:', err.url);
        console.log('Error detalle:', err.error);
        return throwError(() => err);    
        })
      );
    }

        //obtener los muebles desactivados
    getPapelera(): Observable<Mueble[]> {
      if(this.cacheInactivos){
        return of(this.cacheInactivos);
      }
      return this.http.get<Mueble[]>(`${this.myAppUrl}${this.myApiUrl}/papelera`).pipe(
        tap(data => this.cacheInactivos = data)
      );
    }

    getEstadisticas(): Observable<any[]> {
    if (this.cacheEstadisticas) {
      return of(this.cacheEstadisticas);
    }
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}/estadisticas`).pipe(
      tap(data => this.cacheEstadisticas = data)
    );
  }

  limpiarCache() {
    this.cacheMuebles = null;
    this.cacheInactivos = null;
    this.cacheEstadisticas = null;
  }

    // agregar un nuevo mueble
    saveMueble(mueble: FormData): Observable<any>{
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, mueble).pipe(
        tap(res => this.limpiarCache()), 
        catchError(err => throwError(() => err))
      );
    }

updateMueble(id: number, mueble: FormData): Observable<any> {
  return this.http.put<any>(`${this.myAppUrl}${this.myApiUrl}/${id}`, mueble).pipe(
    tap(() => {
      // 1. LIMPIEZA TOTAL: Así obligamos a todas las pantallas a pedir datos nuevos
      this.limpiarCache();
      
      // 2. AVISAR A NOTIFICACIONES: Esto quita el numerito rojo falso
      this._notificacionService.limpiarCache();

      // 3. TRUCO DE PRECARGA: Pedimos los muebles YA mismo
      // Esto hace que cuando llegues al catálogo o dash, los datos ya estén casi listos
      this.getMuebles().subscribe();

      console.log('Caché reseteado. El Dashboard ahora mostrará la realidad.');
    }),
    catchError(err => throwError(() => err))
  );
}

    //eliminar mueble (borrado logico o fisico por id)
    deleteMueble(id:number): Observable<any>{
      return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`).pipe(
        tap(() => this.limpiarCache())
      )
    }

        //restaurar mueble desactivado
    restaurarMueble(id: number): Observable<any> {
      
      return this.http.patch(`${this.myAppUrl}${this.myApiUrl}/restaurar/${id}`,{}).pipe(
        tap(() => this.limpiarCache())
      );
    }

    //editar informacion de un mueble
    getMueble(id:number):Observable<Mueble>{
      return this.http.get<Mueble>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
    }


    //obtener las categorias del back
    getCategorias(): Observable<any[]>{
      return this.http.get<any[]>(`${this.myAppUrl}/api/categorias`);
    }

        //obtener las sucursales del back
    getSucursales(): Observable<any[]>{
      return this.http.get<any[]>(`${this.myAppUrl}/api/sucursales`);
    }
  
    verificarNombre(nombre: string, sucursalId: number): Observable<{ existe: boolean }> {
      return this.http.get<{ existe: boolean }>(
        `${this.myAppUrl}${this.myApiUrl}/verificar-nombre?nombre=${nombre}&sucursal_id=${sucursalId}`
      );
    }

    getMueblesConDetalles(): Observable<Mueble[]> {
      return this.http.get<Mueble[]>(`${this.myAppUrl}${this.myApiUrl}/detalles`);
    }


}
