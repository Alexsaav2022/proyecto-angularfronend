import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PersonasRoutingModule} from "./personas-routing.module";
import {PersonaService} from "../../../providers/services/persona.service";
import {ReactiveFormsModule} from "@angular/forms";
import {PersonasComponents} from "./personas.component";
import {PersonaModalComponent} from "./persona-modal/persona-modal.component";

@NgModule({
  declarations:[
    PersonasComponents,
  PersonaModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonasRoutingModule
  ],
  providers: [PersonaService]
})
export class PersonasModule { }
