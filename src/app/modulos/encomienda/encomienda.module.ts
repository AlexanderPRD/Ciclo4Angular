import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncomiendaRoutingModule } from './encomienda-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { GetComponent } from './get/get.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    GetComponent
  ],
  imports: [
    CommonModule,
    EncomiendaRoutingModule
  ]
})
export class EncomiendaModule { }
