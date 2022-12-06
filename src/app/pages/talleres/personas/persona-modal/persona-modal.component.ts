import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProgramaService} from "../../../../providers/services/programa.service";
import {PersonaService} from "../../../../providers/services/persona.service";



@Component({
  selector: 'app-persona-modal',
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css']
})
export class PersonaModalComponent implements OnInit {

  @Input() title: any;
  @Input() perId: any;
  @Input() item: any;
  formPersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaService: PersonaService) {}

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }

  private formInit(): void {
    const controls = {
      perNombre:   ['', [Validators.required]],
      perApellido: ['', [Validators.required]],
      perDireccion:['', [Validators.required]],
      perDNI:     ['', [Validators.required]],
    };
    this.formPersona = this.formBuilder.group(controls);
  }

  save(): void {
    this.personaService.add$(this.formPersona.value).subscribe(response => {
      if(response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  update(): void {
    this.personaService.update$(this.perId, this.formPersona.value).subscribe(response => {
      if(response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  private updateData(): void {
    const data = this.item;
    this.formPersona.patchValue(data);
  }
}
