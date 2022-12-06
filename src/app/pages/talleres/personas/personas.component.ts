import {Component, Input, OnInit} from '@angular/core';
import {PersonaService} from "../../../providers/services/persona.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import  {PersonaModalComponent} from "./persona-modal/persona-modal.component";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponents implements OnInit {

  personas: any = [];
  constructor(private personaService: PersonaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe( response => {
      this.personas = response.data || [];
    });
  }

  openModal(): void {
    const modal = this.modalService.open(PersonaModalComponent, {
      size: "lg",
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Persona',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: 'primary',
          timer: 1300
        });
        this.getPersonas();
      }
    });
  }
  openModalEdit(item: any): any {
    const modal = this.modalService.open(PersonaModalComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.perId = item.perId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getPersonas();
        Swal.fire({
          title: 'Personas',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1300
        });
      }

    });
  }

  public onDelete(item: any): void {
    const ID = item.perId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.perNombre;
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
          this.personaService.delete$(ID).subscribe(data => {
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
              this.getPersonas();
            }
          });
        }
      });
    }
  }
}


