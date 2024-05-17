
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-waterlevelsensors',
  templateUrl: './edit-waterlevelsensors.component.html',
  styleUrls: ['./edit-waterlevelsensors.component.css']
})
export class EditWaterlevelsensorsComponent {
  reactiveForm_edit_waterlevelsensors !: FormGroup;
  submitted: boolean = false
  loading_edit_waterlevelsensors: boolean = false
  @Input()
  waterlevelsensors_to_edit: any = {}
  @Output()
  cb_edit_waterlevelsensors = new EventEmitter()
  form_details: any = {}
  loading_get_details_add_waterlevelsensors_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
    this.get_details_add_waterlevelsensors_form()
    this.update_form(this.waterlevelsensors_to_edit)
  }
  // mise à jour du formulaire
  update_form(waterlevelsensors_to_edit: any) {
    this.reactiveForm_edit_waterlevelsensors = this.formBuilder.group({
      name: [waterlevelsensors_to_edit.name, Validators.required],
      state: [waterlevelsensors_to_edit.state, Validators.required],
      // dateTime: [waterlevelsensors_to_edit.dateTime, Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_waterlevelsensors.controls; }
  // validation du formulaire
  onSubmit_edit_waterlevelsensors() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_waterlevelsensors.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_waterlevelsensors.invalid) {
      return;
    }
    var waterlevelsensors = this.reactiveForm_edit_waterlevelsensors.value
    this.edit_waterlevelsensors({
      condition: JSON.stringify({ id: this.waterlevelsensors_to_edit.id }),
      data: JSON.stringify(waterlevelsensors)
    })
  }
  // vider le formulaire
  onReset_edit_waterlevelsensors() {
    this.submitted = false;
    this.reactiveForm_edit_waterlevelsensors.reset();
  }
  edit_waterlevelsensors(waterlevelsensors: any) {
    this.loading_edit_waterlevelsensors = true;
    this.api.taf_post("waterlevelsensors/edit", waterlevelsensors, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_waterlevelsensors.emit({
          new_data: JSON.parse(waterlevelsensors.data)
        })
        console.log("Opération effectuée avec succés sur la table waterlevelsensors. Réponse= ", reponse);
        this.onReset_edit_waterlevelsensors()
        alert("Opération effectuée avec succés sur la table waterlevelsensors")
      } else {
        console.log("L'opération sur la table waterlevelsensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_waterlevelsensors = false;
    }, (error: any) => {
      this.loading_edit_waterlevelsensors = false;
    })
  }
  get_details_add_waterlevelsensors_form() {
    this.loading_get_details_add_waterlevelsensors_form = true;
    this.api.taf_post("waterlevelsensors/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table waterlevelsensors. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table waterlevelsensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_waterlevelsensors_form = false;
    }, (error: any) => {
      this.loading_get_details_add_waterlevelsensors_form = false;
    })
  }
}
