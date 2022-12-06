import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AsistenciaService} from "../../../../providers/services/asistencia.service";



@Component({
  selector: 'app-asistencia-modal',
  templateUrl: './asistencia-modal.component.html',
  styleUrls: ['./asistencia-modal.component.css']
})
export class AsistenciaModalComponent implements OnInit {

  @Input() title: any;
  @Input() asiId: any;
  @Input() item: any;
   formAsistencia: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }

  private formInit(): void {
    const controls = {
      personas:   ['', [Validators.required]],
      taller: ['', [Validators.required]],
    };
    this.formAsistencia = this.formBuilder.group(controls);
  }

  save(): void {
      this.asistenciaService.add$(this.formAsistencia.value).subscribe(response => {
      if(response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  update(): void {
    this.asistenciaService.update$(this.asiId, this.formAsistencia.value).subscribe(response => {
      if(response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  private updateData(): void {
    const data = this.item;
    this.formAsistencia.patchValue(data);
  }
}
