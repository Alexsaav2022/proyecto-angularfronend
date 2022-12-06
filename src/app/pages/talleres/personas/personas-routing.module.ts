import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PersonasComponents} from "./personas.component";
const routes: Routes = [
  {
    path: '',
    component: PersonasComponents
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule {
}
