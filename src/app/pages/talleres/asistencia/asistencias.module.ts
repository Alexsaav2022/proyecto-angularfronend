import { NgModule } from '@angular/core';
import {AsistenciasComponent} from "./asistencias.component";
import {AsistenciaModalComponent} from "./asistencia-modal/asistencia-modal.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AsistenciasRoutingModule} from "./asistencias-routing.module"
import {AsistenciaService} from "../../../providers/services/asistencia.service";


@NgModule({
  declarations:[
     AsistenciasComponent,
     AsistenciaModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsistenciasRoutingModule
  ],
  providers: [AsistenciaService]
})
export class AsistenciasModule { }
