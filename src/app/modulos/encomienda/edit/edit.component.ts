import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncomiendaModelo } from 'src/app/modelos/encomienda.model';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private encomiendaService: EncomiendaService,
    private router: Router,
    private route: ActivatedRoute) { }

  fgValidacion = this.fb.group({
        descripcion: ['', [Validators.required]],
        peso: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        presentacion: ['', [Validators.required]],
      });

      id: string=''

      ngOnInit(): void {
        //capturar id de la url
        this.id = this.route.snapshot.params["id"]
        //ejecuto la funcion para buscar el registro
        this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.encomiendaService.getWithId(id).subscribe((data: EncomiendaModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["descripcion"].setValue(data.descripcion)
      this.fgValidacion.controls["peso"].setValue(data.peso)
      this.fgValidacion.controls["tipo"].setValue(data.tipo)
      this.fgValidacion.controls["presentacion"].setValue(data.presentacion)
    })
  }

  edit(){
    let encomienda = new EncomiendaModelo();
    encomienda.id = this.fgValidacion.controls["id"].value;
    encomienda.presentacion = this.fgValidacion.controls["presentacion"].value;
    encomienda.peso = this.fgValidacion.controls["peso"].value;
    encomienda.tipo = this.fgValidacion.controls["tipo"].value;
    encomienda.presentacion = this.fgValidacion.controls["presentacion"].value;

    this.encomiendaService.update(encomienda).subscribe((data: EncomiendaModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}