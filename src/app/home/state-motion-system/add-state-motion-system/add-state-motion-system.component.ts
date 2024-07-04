
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-state-motion-system',
  templateUrl: './add-state-motion-system.component.html',
  styleUrls: ['./add-state-motion-system.component.css']
})
export class AddStateMotionSystemComponent {
  @Output()
  cb_add_stateMotionSystem=new EventEmitter()
  reactiveForm_add_stateMotionSystem !: FormGroup;
  submitted:boolean=false
  loading_add_stateMotionSystem :boolean=false
  form_details: any = {}
  loading_get_details_add_stateMotionSystem_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_stateMotionSystem_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_stateMotionSystem  = this.formBuilder.group({
          state: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_stateMotionSystem .controls; }
  // validation du formulaire
  onSubmit_add_stateMotionSystem () {
      this.submitted = true;
      console.log(this.reactiveForm_add_stateMotionSystem .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_stateMotionSystem .invalid) {
          return;
      }
      var stateMotionSystem =this.reactiveForm_add_stateMotionSystem .value
      this.add_stateMotionSystem (stateMotionSystem )
  }
  // vider le formulaire
  onReset_add_stateMotionSystem () {
      this.submitted = false;
      this.reactiveForm_add_stateMotionSystem .reset();
  }
  add_stateMotionSystem(stateMotionSystem: any) {
      this.loading_add_stateMotionSystem = true;
      this.api.taf_post("stateMotionSystem/add", stateMotionSystem, (reponse: any) => {
      this.loading_add_stateMotionSystem = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table stateMotionSystem. Réponse= ", reponse);
          this.onReset_add_stateMotionSystem()
          alert("Opération éffectuée avec succés")
          this.cb_add_stateMotionSystem.emit({
            status:true,
            stateMotionSystem:reponse.data
          })
      } else {
          console.log("L'opération sur la table stateMotionSystem a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_stateMotionSystem = false;
    })
  }
  
  get_details_add_stateMotionSystem_form() {
      this.loading_get_details_add_stateMotionSystem_form = true;
      this.api.taf_post("stateMotionSystem/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table stateMotionSystem. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table stateMotionSystem a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_stateMotionSystem_form = false;
      }, (error: any) => {
      this.loading_get_details_add_stateMotionSystem_form = false;
    })
  }
}
