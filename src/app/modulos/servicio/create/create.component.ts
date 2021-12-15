import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { EncomiendaModelo } from 'src/app/modelos/encomienda.model';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private encomiendaService: EncomiendaService,
    private router: Router) { }

 getAllServicio(){
    this.servicioService.getAll().subscribe((data: ServicioModelo[]) => {
      this.listadoServicio = data
      console.log(data)
    })
  }


  fgValidacion = this.fb.group({
        origen: ['', [Validators.required]],
        destino: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        hora: ['', [Validators.required]],
        encomienda: ['',[Validators.required]],
        valor: ['', [Validators.required]],
      });

  listadoServicio: ServicioModelo[] = []
  listadoCliente: ClienteModelo[] = []
  listadoEncomienda: EncomiendaModelo[] = []


  ngOnInit(): void {
    this.getAllCliente()
    this.getAllEncomienda()
  }

  store(){
    let servicio = new ServicioModelo();
    servicio.origen = this.fgValidacion.controls["origen"].value;
    servicio.destino = this.fgValidacion.controls["destino"].value;
    servicio.fecha = new Date(this.fgValidacion.controls["fecha"].value).toISOString()
    servicio.hora = this.fgValidacion.controls["hora"].value;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value;
    servicio.valor = this.fgValidacion.controls["valor"].value;

    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicio/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllCliente(){
    this.clienteService.getAll().subscribe((data: ClienteModelo[]) => {
      this.listadoCliente = data
      console.log(data)
    })
  }
  getAllEncomienda(){
    this.encomiendaService.getAll().subscribe((data: EncomiendaModelo[]) => {
      this.listadoEncomienda = data
      console.log(data)
    })
  }

}