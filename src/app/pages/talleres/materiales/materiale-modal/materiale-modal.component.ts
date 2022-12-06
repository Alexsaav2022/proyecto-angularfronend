import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonaService} from "../../../../providers/services/persona.service";
import {MaterialesService} from "../../../../providers/services/materiales.service";


@Component({
  selector: 'app-materiale-modal',
  templateUrl: './materiale-modal.component.html',
  styleUrls: ['./materiale-modal.component.css']
})
export class MaterialeModalComponent implements OnInit {

  @Input() title: any;
  @Input() editId: any;
  @Input() item: any;
  formMateriale: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private materialeService:MaterialesService) { }

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }

  }
  private formInit(): void {
    const controls = {
      editNombre:      ['', [Validators.required]],
      editDescripcion: ['', [Validators.required]],

    };
    this.formMateriale = this.formBuilder.group(controls);
  }
     save(): void {
      this.materialeService.add$(this.formMateriale.value).subscribe(response => {
        if(response.success){
          this.activeModal.close({success: true, message: response.message});
        }
      });
    }
  update(): void {
    this.materialeService.update$(this.editId, this.formMateriale.value).subscribe(response => {
      if(response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }

  private updateData(): void {
    const data = this.item;
    this.formMateriale.patchValue(data);
  }
}



