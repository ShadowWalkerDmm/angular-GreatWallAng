
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-authority',
  templateUrl: './add-authority.component.html',
  styleUrls: ['./add-authority.component.css']
})
export class AddAuthorityComponent {
  @Output()
  cb_add_authority=new EventEmitter()
  reactiveForm_add_authority !: FormGroup;
  submitted:boolean=false
  loading_add_authority :boolean=false
  form_details: any = {}
  loading_get_details_add_authority_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_authority_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_authority  = this.formBuilder.group({
          privileges: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_authority .controls; }
  // validation du formulaire
  onSubmit_add_authority () {
      this.submitted = true;
      console.log(this.reactiveForm_add_authority .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_authority .invalid) {
          return;
      }
      var authority =this.reactiveForm_add_authority .value
      this.add_authority (authority )
  }
  // vider le formulaire
  onReset_add_authority () {
      this.submitted = false;
      this.reactiveForm_add_authority .reset();
  }
  add_authority(authority: any) {
      this.loading_add_authority = true;
      this.api.taf_post("authority/add", authority, (reponse: any) => {
      this.loading_add_authority = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table authority. Réponse= ", reponse);
          this.onReset_add_authority()
          alert("Opération éffectuée avec succés")
          this.cb_add_authority.emit({
            status:true,
            authority:reponse.data
          })
      } else {
          console.log("L'opération sur la table authority a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_authority = false;
    })
  }
  
  get_details_add_authority_form() {
      this.loading_get_details_add_authority_form = true;
      this.api.taf_post("authority/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table authority. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table authority a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_authority_form = false;
      }, (error: any) => {
      this.loading_get_details_add_authority_form = false;
    })
  }
}
