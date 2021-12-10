import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) { }

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
      
  ngOnInit(): void {
  }

  store(){
    let cliente = new ClienteModelo();
    cliente.nombre = this.fgValidacion.controls["nombre"].value;
    cliente.apellidos = this.fgValidacion.controls["apellidos"].value;
    cliente.correo = this.fgValidacion.controls["correo"].value;
    cliente.telefono = this.fgValidacion.controls["telefono"].value;
 
    this.clienteService.store(cliente).subscribe((data: ClienteModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}
