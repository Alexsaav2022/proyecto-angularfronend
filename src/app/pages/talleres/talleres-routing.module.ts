import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TalleresComponent} from "./talleres.component";

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: TalleresComponent,
    children: [{
      path: 'taller',
      loadChildren: () => import('./taller/taller.module')
        .then(m => m.TallerModule)
      },
      {
        path: 'materiales',
        loadChildren: () => import('./materiales/materiales.module')
          .then(m => m.MaterialesModule)
      },
      {
        path: 'programas',
        loadChildren: () => import('./programas/programas.module')
          .then(m => m.ProgramasModule)
      },
      {

        path: 'personas',
        loadChildren: () => import('./personas/personas.module')
          .then(m => m.PersonasModule)
      },
      {

        path: 'personataller',
        loadChildren: () => import('./personataller/personataller.module')
          .then(m => m.PersonatallerModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('./reportes/reportes.module')
          .then(m => m.ReportesModule)

      },
      {
        path: 'asistencias',
        loadChildren: () => import('./asistencia/asistencias.module')
          .then(m => m.AsistenciasModule)
      },
      {
        path: 'certificados',
        loadChildren: () => import('./certificado/certificados.module')
          .then(m => m.CertificadosModule)



      }]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalleresRoutingModule {
}
