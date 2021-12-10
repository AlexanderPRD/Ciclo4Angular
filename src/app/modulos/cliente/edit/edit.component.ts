import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }


    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
      correo: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    });
 
    id: string=''
  
  ngOnInit(): void {
    //capturar id de la url
    this.id = this.route.snapshot.params["id"]
    //ejecuto la funcion para buscar el registro
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.clienteService.getWithId(id).subscribe((data: ClienteModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["cedula"].setValue(data.cedula)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["apellidos"].setValue(data.apellidos)
      this.fgValidacion.controls["pais"].setValue(data.pais)
      this.fgValidacion.controls["departamento"].setValue(data.departamento)
      this.fgValidacion.controls["ciudad"].setValue(data.ciudad)
      this.fgValidacion.controls["direccion"].setValue(data.direccion)
      this.fgValidacion.controls["telefono"].setValue(data.telefono)
      this.fgValidacion.controls["correo"].setValue(data.correo)
    })
  }

  edit(){
    let cliente = new ClienteModelo();
    cliente.id = this.fgValidacion.controls["id"].value;
    cliente.cedula = this.fgValidacion.controls["cedula"].value;
    cliente.nombre = this.fgValidacion.controls["nombre"].value;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value;
    cliente.pais = this.fgValidacion.controls["pais"].value;
    cliente.departamento = this.fgValidacion.controls["departamento"].value;
    cliente.ciudad = this.fgValidacion.controls["ciudad"].value;
    cliente.direccion = this.fgValidacion.controls["direccion"].value;
    cliente.telefono = this.fgValidacion.controls["telefono"].value;
    cliente.correo = this.fgValidacion.controls["correo"].value;
 
    this.clienteService.update(cliente).subscribe((data: ClienteModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}