import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonatallerService} from "../../../../providers/services/personataller.service";


@Component({
  selector: 'app-personataller-modal',
  templateUrl: './personataller-modal.component.html',
  styleUrls: ['./personataller-modal.component.css']
})
export class PersonatallerModalComponent implements OnInit {

  @Input() title: any;
  @Input() petaId: any;
  @Input() item: any;


  formPersonataller: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personatallerService:PersonatallerService) { }

  ngOnInit(): void {
    this.formInit();
    if(this.item) {
      this.updateData();
    }
  }
  private formInit(): void {
    const controls = {
      petaCarrera:  ['', [Validators.required]],
      petaCiclo:  ['', [Validators.required]],
      petaAsistencia:  ['', [Validators.required]],

    };
    this.formPersonataller = this.formBuilder.group(controls);
  }
     save(): void {
      this.personatallerService.add$(this.formPersonataller.value).subscribe(response => {
        if(response.success){
          this.activeModal.close({success: true, message: response.message});
        }
      });
    }
  update(): void {
    this.personatallerService.update$(this.petaId, this.formPersonataller.value).subscribe(response => {
      if(response.success) {
        this.activeModal.close({success: true, message: response.message});
      }
    });
  }




  private updateData(): void {
    const data = this.item;
    this.formPersonataller.patchValue(data);
  }

  }
