import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteModelo } from '../modelos/cliente.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken(); }

      url = "http://localhost:3000"
    token: string = ''

    store(cliente: ClienteModelo): Observable<ClienteModelo> {
      return this.http.post<ClienteModelo>(`${this.url}/clientes`, {
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        correo: cliente.correo
      });
    }

    getAll(): Observable<ClienteModelo[]>{
      return this.http.get<ClienteModelo[]>(`${this.url}/clientes`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(cliente: ClienteModelo): Observable<ClienteModelo> {
      return this.http.patch<ClienteModelo>(`${this.url}/clientes/${cliente.id}`, {
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        correo: cliente.correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<ClienteModelo[]>{
      return this.http.delete<ClienteModelo[]>(`${this.url}/clientes/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<ClienteModelo>{
      return this.http.get<ClienteModelo>(`${this.url}/clientes/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }





}
