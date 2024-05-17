
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-windowstatus',
  templateUrl: './add-windowstatus.component.html',
  styleUrls: ['./add-windowstatus.component.css']
})
export class AddWindowstatusComponent {
  @Output()
  cb_add_windowstatus = new EventEmitter()
  reactiveForm_add_windowstatus !: FormGroup;
  submitted: boolean = false
  loading_add_windowstatus: boolean = false
  form_details: any = {}
  loading_get_details_add_windowstatus_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_windowstatus_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_windowstatus = this.formBuilder.group({
      name: ["", Validators.required],
      status: ["", Validators.required],
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_windowstatus.controls; }
  // validation du formulaire
  onSubmit_add_windowstatus() {
    this.submitted = true;
    console.log(this.reactiveForm_add_windowstatus.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_windowstatus.invalid) {
      return;
    }
    var windowstatus = this.reactiveForm_add_windowstatus.value
    this.add_windowstatus(windowstatus)
  }
  // vider le formulaire
  onReset_add_windowstatus() {
    this.submitted = false;
    this.reactiveForm_add_windowstatus.reset();
  }
  add_windowstatus(windowstatus: any) {
    this.loading_add_windowstatus = true;
    this.api.taf_post("windowstatus/add", windowstatus, (reponse: any) => {
      this.loading_add_windowstatus = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table windowstatus. Réponse= ", reponse);
        this.onReset_add_windowstatus()
        alert("Opération éffectuée avec succés")
        this.cb_add_windowstatus.emit({
          status: true,
          windowstatus: reponse.data
        })
      } else {
        console.log("L'opération sur la table windowstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_windowstatus = false;
    })
  }

  get_details_add_windowstatus_form() {
    this.loading_get_details_add_windowstatus_form = true;
    this.api.taf_post("windowstatus/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table windowstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table windowstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_windowstatus_form = false;
    }, (error: any) => {
      this.loading_get_details_add_windowstatus_form = false;
    })
  }
}
