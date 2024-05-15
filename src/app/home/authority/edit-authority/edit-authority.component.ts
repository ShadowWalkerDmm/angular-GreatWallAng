
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-authority',
  templateUrl: './edit-authority.component.html',
  styleUrls: ['./edit-authority.component.css']
})
export class EditAuthorityComponent {
  reactiveForm_edit_authority !: FormGroup;
  submitted: boolean = false
  loading_edit_authority: boolean = false
  @Input()
  authority_to_edit: any = {}
  @Output()
  cb_edit_authority=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_authority_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_authority_form()
      this.update_form(this.authority_to_edit)
  }
  // mise à jour du formulaire
  update_form(authority_to_edit:any) {
      this.reactiveForm_edit_authority = this.formBuilder.group({
          privileges : [authority_to_edit.privileges, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_authority .controls; }
  // validation du formulaire
  onSubmit_edit_authority() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_authority.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_authority.invalid) {
          return;
      }
      var authority = this.reactiveForm_edit_authority.value
      this.edit_authority({
      condition:JSON.stringify({id_authority:this.authority_to_edit.id_authority}),
      data:JSON.stringify(authority)
      })
  }
  // vider le formulaire
  onReset_edit_authority() {
      this.submitted = false;
      this.reactiveForm_edit_authority.reset();
  }
  edit_authority(authority: any) {
      this.loading_edit_authority = true;
      this.api.taf_post("authority/edit", authority, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_authority.emit({
                  new_data:JSON.parse(authority.data)
              })
              console.log("Opération effectuée avec succés sur la table authority. Réponse= ", reponse);
              this.onReset_edit_authority()
              alert("Opération effectuée avec succés sur la table authority")
          } else {
              console.log("L'opération sur la table authority a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_authority = false;
      }, (error: any) => {
          this.loading_edit_authority = false;
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
