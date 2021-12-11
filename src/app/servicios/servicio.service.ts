import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioModelo } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken(); }

      url = "http://localhost:3000"
    token: string = ''

    store(servicio: ServicioModelo): Observable<ServicioModelo> {
      return this.http.post<ServicioModelo>(`${this.url}/servicio`, {

          origen:servicio.origen,
          destino:servicio.destino,
          fecha:servicio.fecha,
          hora:servicio.hora,
          encomienda:servicio.encomienda,
          valor:servicio.valor

      });
    }

    getAll(): Observable<ServicioModelo[]>{
      return this.http.get<ServicioModelo[]>(`${this.url}/servicio`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(servicio: ServicioModelo): Observable<ServicioModelo> {
      return this.http.patch<ServicioModelo>(`${this.url}/servicio/${servicio.id}`, {
          origen:servicio.origen,
          destino:servicio.destino,
          fecha:servicio.fecha,
          hora:servicio.hora,
          encomienda:servicio.encomienda,
          valor:servicio.valor
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<ServicioModelo[]>{
      return this.http.delete<ServicioModelo[]>(`${this.url}/servicio/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<ServicioModelo>{
      return this.http.get<ServicioModelo>(`${this.url}/servicio/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }





}
