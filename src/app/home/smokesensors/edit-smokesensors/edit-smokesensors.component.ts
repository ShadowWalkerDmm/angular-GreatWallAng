
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-smokesensors',
  templateUrl: './edit-smokesensors.component.html',
  styleUrls: ['./edit-smokesensors.component.css']
})
export class EditSmokesensorsComponent {
  reactiveForm_edit_smokesensors !: FormGroup;
  submitted: boolean = false
  loading_edit_smokesensors: boolean = false
  @Input()
  smokesensors_to_edit: any = {}
  @Output()
  cb_edit_smokesensors = new EventEmitter()
  form_details: any = {}
  loading_get_details_add_smokesensors_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
    this.get_details_add_smokesensors_form()
    this.update_form(this.smokesensors_to_edit)
  }
  // mise à jour du formulaire
  update_form(smokesensors_to_edit: any) {
    this.reactiveForm_edit_smokesensors = this.formBuilder.group({
      state: [smokesensors_to_edit.state, Validators.required],
      // updated_at: [smokesensors_to_edit.updated_at, Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_smokesensors.controls; }
  // validation du formulaire
  onSubmit_edit_smokesensors() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_smokesensors.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_smokesensors.invalid) {
      return;
    }
    var smokesensors = this.reactiveForm_edit_smokesensors.value
    this.edit_smokesensors({
      condition: JSON.stringify({ id: this.smokesensors_to_edit.id }),
      data: JSON.stringify(smokesensors)
    })
  }
  // vider le formulaire
  onReset_edit_smokesensors() {
    this.submitted = false;
    this.reactiveForm_edit_smokesensors.reset();
  }
  edit_smokesensors(smokesensors: any) {
    this.loading_edit_smokesensors = true;
    this.api.taf_post("smokesensors/edit", smokesensors, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_smokesensors.emit({
          new_data: JSON.parse(smokesensors.data)
        })
        console.log("Opération effectuée avec succés sur la table smokesensors. Réponse= ", reponse);
        this.onReset_edit_smokesensors()
        alert("Opération effectuée avec succés sur la table smokesensors")
      } else {
        console.log("L'opération sur la table smokesensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_smokesensors = false;
    }, (error: any) => {
      this.loading_edit_smokesensors = false;
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
