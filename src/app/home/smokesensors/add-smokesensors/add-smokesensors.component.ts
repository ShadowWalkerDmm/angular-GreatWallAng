
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-smokesensors',
  templateUrl: './add-smokesensors.component.html',
  styleUrls: ['./add-smokesensors.component.css']
})
export class AddSmokesensorsComponent {
  @Output()
  cb_add_smokesensors = new EventEmitter()
  reactiveForm_add_smokesensors !: FormGroup;
  submitted: boolean = false
  loading_add_smokesensors: boolean = false
  form_details: any = {}
  loading_get_details_add_smokesensors_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_smokesensors_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_smokesensors = this.formBuilder.group({
      state: ["", Validators.required]
      // updated_at: ["", Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_smokesensors.controls; }
  // validation du formulaire
  onSubmit_add_smokesensors() {
    this.submitted = true;
    console.log(this.reactiveForm_add_smokesensors.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_smokesensors.invalid) {
      return;
    }
    var smokesensors = this.reactiveForm_add_smokesensors.value
    this.add_smokesensors(smokesensors)
  }
  // vider le formulaire
  onReset_add_smokesensors() {
    this.submitted = false;
    this.reactiveForm_add_smokesensors.reset();
  }
  add_smokesensors(smokesensors: any) {
    this.loading_add_smokesensors = true;
    this.api.taf_post("smokesensors/add", smokesensors, (reponse: any) => {
      this.loading_add_smokesensors = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table smokesensors. Réponse= ", reponse);
        this.onReset_add_smokesensors()
        alert("Opération éffectuée avec succés")
        this.cb_add_smokesensors.emit({
          status: true,
          smokesensors: reponse.data
        })
      } else {
        console.log("L'opération sur la table smokesensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_smokesensors = false;
    })
  }

  get_details_add_smokesensors_form() {
    this.loading_get_details_add_smokesensors_form = true;
    this.api.taf_post("smokesensors/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table smokesensors. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table smokesensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_smokesensors_form = false;
    }, (error: any) => {
      this.loading_get_details_add_smokesensors_form = false;
    })
  }
}
