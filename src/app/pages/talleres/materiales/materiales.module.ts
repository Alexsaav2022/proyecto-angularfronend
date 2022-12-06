import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesComponent } from './materiales.component';
import {MaterialesRoutingModule} from "./materiales-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialesService} from "../../../providers/services/materiales.service";
import {MaterialeModalComponent} from "./materiale-modal/materiale-modal.component";




@NgModule({
  declarations: [
    MaterialesComponent,
    MaterialeModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialesRoutingModule
  ],
  providers: [MaterialesService]
})
export class MaterialesModule { }
