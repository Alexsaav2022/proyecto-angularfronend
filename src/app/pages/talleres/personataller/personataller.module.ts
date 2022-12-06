import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {PersonatallerRoutingModule} from "./personataller-routing.module";
import {CommonModule} from "@angular/common";
import {PersonatallerModalComponent} from "./personataller-modal/personataller-modal.component";
import {PersonastallerComponent} from "./personataller.component";
import {PersonatallerService} from "../../../providers/services/personataller.service";



@NgModule({
  declarations: [
    PersonastallerComponent,
    PersonatallerModalComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonatallerRoutingModule
  ],
  providers:[PersonatallerService]
})
export class PersonatallerModule { }
