import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServicioService } from 'src/app/servicios/servicio.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute) { }


    fgValidacion = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      encomienda: ['',[Validators.required]],
      valor: ['', [Validators.required]],
    });

    id: string=''

  ngOnInit(): void {
    //capturar id de la url
    this.id = this.route.snapshot.params["id"]
    //ejecuto la funcion para buscar el registro
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["origen"].setValue(data.origen)
      this.fgValidacion.controls["destino"].setValue(data.destino)
      this.fgValidacion.controls["fecha"].setValue(data.fecha)
      this.fgValidacion.controls["hora"].setValue(data.hora)
      this.fgValidacion.controls["encomienda"].setValue(data.encomienda)
      this.fgValidacion.controls["valor"].setValue(data.valor)
    })
  }

  edit(){
    let servicio = new ServicioModelo();
    servicio.id = this.fgValidacion.controls["id"].value;
    servicio.origen = this.fgValidacion.controls["origen"].value;
    servicio.destino = this.fgValidacion.controls["destino"].value;
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora = this.fgValidacion.controls["hora"].value;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value;
    servicio.valor = this.fgValidacion.controls["valor"].value;

    this.servicioService.update(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
