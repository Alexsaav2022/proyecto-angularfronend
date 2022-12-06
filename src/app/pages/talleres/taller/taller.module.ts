import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TallerComponent } from './taller.component';
import {TallerRoutingModule} from "./taller-routing.module";
import {TallerModalComponent} from "./taller-modal/taller-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TallerService} from "../../../providers/services/taller.service";



@NgModule({
  declarations: [
    TallerComponent,
    TallerModalComponent
  ],
  imports: [
    CommonModule,
    TallerRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TallerService]
})
export class TallerModule { }
