import {AsistenciaModalComponent} from "./asistencia-modal/asistencia-modal.component";
import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import  {AsistenciaService} from "../../../providers/services/asistencia.service";


@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  asistencias: any = [];
  constructor(private asistenciaService: AsistenciaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAsistencia();
  }

  getAsistencia(): void {
    this.asistenciaService.getAll$().subscribe( response => {
      this.asistencias = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(AsistenciaModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Asistencia',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getAsistencia();
      }
    });
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(AsistenciaModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.asiId = item.asiId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getAsistencia();
        Swal.fire({
          title: 'Asistencias',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1300
        });
      }

    });
  }

  public onDelete(item: any): void {
    const ID = item.asiId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.personas;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.asistenciaService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                icon: 'success',
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getAsistencia();
            }
          });
        }
      });
    }
  }
}


