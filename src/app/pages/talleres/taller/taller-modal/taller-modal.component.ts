import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProgramaService} from "../../../../providers/services/programa.service";
import {TallerService} from "../../../../providers/services/taller.service";



@Component({
  selector: 'app-taller-modal',
  templateUrl: './taller-modal.component.html',
  styleUrls: ['./taller-modal.component.css']
})
export class TallerModalComponent implements OnInit {

  @Input() title: any;
  @Input() tallerId: any;
  @Input() item: any;
  formTaller: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private tallerService: TallerService) {}

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }

  private formInit(): void {
    const controls = {

      tallerNombre:      ['', [Validators.required]],
      tallerDescripcion: ['', [Validators.required]],
      tallerDireccion:   ['', [Validators.required]],
      tallerFecha:       ['', [Validators.required]],
      tallerLugar:       ['', [Validators.required]],
    };
    this.formTaller = this.formBuilder.group(controls);
  }

  save(): void {
    this.tallerService.add$(this.formTaller.value).subscribe(response => {
      if(response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }
  update(): void {
    this.tallerService.update$(this.tallerId, this.formTaller.value).subscribe(response => {
      if(response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    }) ;
  }

  private updateData() : void {
    const data =this.item;
    this.formTaller.patchValue(data);
  }
}

