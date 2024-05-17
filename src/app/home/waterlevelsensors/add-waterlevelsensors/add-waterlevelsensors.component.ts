
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-waterlevelsensors',
  templateUrl: './add-waterlevelsensors.component.html',
  styleUrls: ['./add-waterlevelsensors.component.css']
})
export class AddWaterlevelsensorsComponent {
  @Output()
  cb_add_waterlevelsensors = new EventEmitter()
  reactiveForm_add_waterlevelsensors !: FormGroup;
  submitted: boolean = false
  loading_add_waterlevelsensors: boolean = false
  form_details: any = {}
  loading_get_details_add_waterlevelsensors_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_waterlevelsensors_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_waterlevelsensors = this.formBuilder.group({
      name: ["", Validators.required],
      state: ["", Validators.required],
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_waterlevelsensors.controls; }
  // validation du formulaire
  onSubmit_add_waterlevelsensors() {
    this.submitted = true;
    console.log(this.reactiveForm_add_waterlevelsensors.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_waterlevelsensors.invalid) {
      return;
    }
    var waterlevelsensors = this.reactiveForm_add_waterlevelsensors.value
    this.add_waterlevelsensors(waterlevelsensors)
  }
  // vider le formulaire
  onReset_add_waterlevelsensors() {
    this.submitted = false;
    this.reactiveForm_add_waterlevelsensors.reset();
  }
  add_waterlevelsensors(waterlevelsensors: any) {
    this.loading_add_waterlevelsensors = true;
    this.api.taf_post("waterlevelsensors/add", waterlevelsensors, (reponse: any) => {
      this.loading_add_waterlevelsensors = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table waterlevelsensors. Réponse= ", reponse);
        this.onReset_add_waterlevelsensors()
        alert("Opération éffectuée avec succés")
        this.cb_add_waterlevelsensors.emit({
          status: true,
          waterlevelsensors: reponse.data
        })
      } else {
        console.log("L'opération sur la table waterlevelsensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_waterlevelsensors = false;
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
