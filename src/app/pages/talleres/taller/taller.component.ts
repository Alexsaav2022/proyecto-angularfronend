import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../providers/services/taller.service";
import Swal from "sweetalert2";
import {TallerModalComponent} from "./taller-modal/taller-modal.component";

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {
  taller: any = [];
  constructor(private tallerService: TallerService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTaller();
  }
  getTaller(): void {
    this.tallerService.getAll$().subscribe( response => {
      this.taller = response.data || [];
    });
}
  openModal(): void {
    const modal = this.modalService.open(TallerModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'taller',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getTaller();
      }
    });
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(TallerModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallerId = item.tallerId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getTaller();
        Swal.fire({
          title: 'taller',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1300
        });
      }

    });
  }

  public onDelete(item: any): void {
    const ID = item.tallerId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.tallerNombre;
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
          this.tallerService.delete$(ID).subscribe(data => {
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
              this.getTaller();
            }
          });
        }
      });
    }
  }
}



