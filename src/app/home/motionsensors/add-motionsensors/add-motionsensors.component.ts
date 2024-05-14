
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-motionsensors',
  templateUrl: './add-motionsensors.component.html',
  styleUrls: ['./add-motionsensors.component.css']
})
export class AddMotionsensorsComponent {
  @Output()
  cb_add_motionsensors=new EventEmitter()
  reactiveForm_add_motionsensors !: FormGroup;
  submitted:boolean=false
  loading_add_motionsensors :boolean=false
  form_details: any = {}
  loading_get_details_add_motionsensors_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_motionsensors_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_motionsensors  = this.formBuilder.group({
          state: ["", Validators.required],
dateTime: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_motionsensors .controls; }
  // validation du formulaire
  onSubmit_add_motionsensors () {
      this.submitted = true;
      console.log(this.reactiveForm_add_motionsensors .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_motionsensors .invalid) {
          return;
      }
      var motionsensors =this.reactiveForm_add_motionsensors .value
      this.add_motionsensors (motionsensors )
  }
  // vider le formulaire
  onReset_add_motionsensors () {
      this.submitted = false;
      this.reactiveForm_add_motionsensors .reset();
  }
  add_motionsensors(motionsensors: any) {
      this.loading_add_motionsensors = true;
      this.api.taf_post("motionsensors/add", motionsensors, (reponse: any) => {
      this.loading_add_motionsensors = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table motionsensors. Réponse= ", reponse);
          this.onReset_add_motionsensors()
          alert("Opération éffectuée avec succés")
          this.cb_add_motionsensors.emit({
            status:true,
            motionsensors:reponse.data
          })
      } else {
          console.log("L'opération sur la table motionsensors a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_motionsensors = false;
    })
  }
  
  get_details_add_motionsensors_form() {
      this.loading_get_details_add_motionsensors_form = true;
      this.api.taf_post("motionsensors/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table motionsensors. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table motionsensors a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_motionsensors_form = false;
      }, (error: any) => {
      this.loading_get_details_add_motionsensors_form = false;
    })
  }
}
