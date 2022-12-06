import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {PersonatallerModalComponent} from "./personataller-modal/personataller-modal.component";
import {PersonatallerService} from "../../../providers/services/personataller.service";


@Component({
  selector: 'app-personataller',
  templateUrl: './personataller.component.html',
  styleUrls: ['./personataller.component.css']
})
export class PersonastallerComponent implements OnInit {

  personastaller: any = [];

  constructor(private personatallerService: PersonatallerService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getPersonastaller();
  }

  getPersonastaller(): void {
    this.personatallerService.getAll$().subscribe(response => {
      this.personastaller = response.data || [];

    });
  }

  openModal(): void {
    const modal = this.modalService.open(PersonatallerModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Persona Taller',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: 'primary',
          timer: 1500
        });
        this.getPersonastaller();
      }
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(PersonatallerModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.petaId = item.petaId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getPersonastaller();
        Swal.fire({
          title: 'Persona Taller',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1300
        });
      }

    });
  }

  public onDelete(item: any): void {
    const ID = item.petaId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.petaCarrera;
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
          this.personatallerService.delete$(ID).subscribe(data => {
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
              this.getPersonastaller();
            }
          });
        }
      });

    }
  }
}



