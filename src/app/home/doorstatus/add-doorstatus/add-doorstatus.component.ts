
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-doorstatus',
  templateUrl: './add-doorstatus.component.html',
  styleUrls: ['./add-doorstatus.component.css']
})
export class AddDoorstatusComponent {
  @Output()
  cb_add_doorstatus = new EventEmitter()
  reactiveForm_add_doorstatus !: FormGroup;
  submitted: boolean = false
  loading_add_doorstatus: boolean = false
  form_details: any = {}
  loading_get_details_add_doorstatus_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_doorstatus_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_doorstatus = this.formBuilder.group({
      name: ["", Validators.required],
      state: ["", Validators.required],
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_doorstatus.controls; }
  // validation du formulaire
  onSubmit_add_doorstatus() {
    this.submitted = true;
    console.log(this.reactiveForm_add_doorstatus.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_doorstatus.invalid) {
      return;
    }
    var doorstatus = this.reactiveForm_add_doorstatus.value
    this.add_doorstatus(doorstatus)
  }
  // vider le formulaire
  onReset_add_doorstatus() {
    this.submitted = false;
    this.reactiveForm_add_doorstatus.reset();
  }
  add_doorstatus(doorstatus: any) {
    this.loading_add_doorstatus = true;
    this.api.taf_post("doorstatus/add", doorstatus, (reponse: any) => {
      this.loading_add_doorstatus = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table doorstatus. Réponse= ", reponse);
        this.onReset_add_doorstatus()
        alert("Opération éffectuée avec succés")
        this.cb_add_doorstatus.emit({
          status: true,
          doorstatus: reponse.data
        })
      } else {
        console.log("L'opération sur la table doorstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_doorstatus = false;
    })
  }

  get_details_add_doorstatus_form() {
    this.loading_get_details_add_doorstatus_form = true;
    this.api.taf_post("doorstatus/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table doorstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table doorstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_doorstatus_form = false;
    }, (error: any) => {
      this.loading_get_details_add_doorstatus_form = false;
    })
  }
}
