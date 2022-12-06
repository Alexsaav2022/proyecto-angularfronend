import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MaterialesService} from "../../../providers/services/materiales.service";
import Swal from "sweetalert2";
import {MaterialeModalComponent} from "./materiale-modal/materiale-modal.component";
import {ProgramaModalComponent} from "../programas/programa-modal/programa-modal.component";

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  materiales: any = [];
  constructor(private materialeService: MaterialesService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMateriales();
  }
  getMateriales(): void {
    this.materialeService.getAll$().subscribe(response => {
      this.materiales = response.data || [];
    });
}
  openModal(): void {
    const modal = this.modalService.open(MaterialeModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Mateiales',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getMateriales();
      }
    });
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(MaterialeModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.editId = item.editId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getMateriales();
        Swal.fire({
          title: 'Materiales',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1300
        });
      }

    });
  }
  public onDelete(item: any): void {
    const ID = item.editId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.editNombre;
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
          this.materialeService.delete$(ID).subscribe(data => {
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
              this.getMateriales();
            }
          });
        }
      });
    }
  }
}







