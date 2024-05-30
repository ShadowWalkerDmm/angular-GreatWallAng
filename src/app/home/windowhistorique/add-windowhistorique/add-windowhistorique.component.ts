
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-windowhistorique',
  templateUrl: './add-windowhistorique.component.html',
  styleUrls: ['./add-windowhistorique.component.css']
})
export class AddWindowhistoriqueComponent {
  @Output()
  cb_add_windowhistorique=new EventEmitter()
  reactiveForm_add_windowhistorique !: FormGroup;
  submitted:boolean=false
  loading_add_windowhistorique :boolean=false
  form_details: any = {}
  loading_get_details_add_windowhistorique_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_windowhistorique_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_windowhistorique  = this.formBuilder.group({
          idWindow: ["", Validators.required],
state: ["", Validators.required],
uploadDate: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_windowhistorique .controls; }
  // validation du formulaire
  onSubmit_add_windowhistorique () {
      this.submitted = true;
      console.log(this.reactiveForm_add_windowhistorique .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_windowhistorique .invalid) {
          return;
      }
      var windowhistorique =this.reactiveForm_add_windowhistorique .value
      this.add_windowhistorique (windowhistorique )
  }
  // vider le formulaire
  onReset_add_windowhistorique () {
      this.submitted = false;
      this.reactiveForm_add_windowhistorique .reset();
  }
  add_windowhistorique(windowhistorique: any) {
      this.loading_add_windowhistorique = true;
      this.api.taf_post("windowhistorique/add", windowhistorique, (reponse: any) => {
      this.loading_add_windowhistorique = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table windowhistorique. Réponse= ", reponse);
          this.onReset_add_windowhistorique()
          alert("Opération éffectuée avec succés")
          this.cb_add_windowhistorique.emit({
            status:true,
            windowhistorique:reponse.data
          })
      } else {
          console.log("L'opération sur la table windowhistorique a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_windowhistorique = false;
    })
  }
  
  get_details_add_windowhistorique_form() {
      this.loading_get_details_add_windowhistorique_form = true;
      this.api.taf_post("windowhistorique/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table windowhistorique. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table windowhistorique a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_windowhistorique_form = false;
      }, (error: any) => {
      this.loading_get_details_add_windowhistorique_form = false;
    })
  }
}
