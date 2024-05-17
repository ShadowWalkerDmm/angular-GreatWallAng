
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  reactiveForm_edit_user !: FormGroup;
  submitted: boolean = false
  loading_edit_user: boolean = false
  @Input()
  user_to_edit: any = {}
  @Output()
  cb_edit_user = new EventEmitter()
  form_details: any = {}
  loading_get_details_add_user_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
    this.get_details_add_user_form()
    this.update_form(this.user_to_edit)
  }
  // mise à jour du formulaire
  update_form(user_to_edit: any) {
    this.reactiveForm_edit_user = this.formBuilder.group({
      // firstName: [user_to_edit.firstName, Validators.required],
      // lastName: [user_to_edit.lastName, Validators.required],
      // email: [user_to_edit.email, Validators.required],
      // password: [user_to_edit.password, Validators.required],
      // phone: [user_to_edit.phone, Validators.required],
      // relationship: [user_to_edit.relationship, Validators.required],
      // authority_id: [user_to_edit.authority_id, Validators.required],
      status: [user_to_edit.status, Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_user.controls; }
  // validation du formulaire
  onSubmit_edit_user() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_user.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_user.invalid) {
      return;
    }
    var user = this.reactiveForm_edit_user.value
    console.log(this.user_to_edit.id)
    this.edit_user({
      condition: JSON.stringify({ id: this.user_to_edit.id }),
      data: JSON.stringify(user)
    })
  }
  // vider le formulaire
  onReset_edit_user() {
    this.submitted = false;
    this.reactiveForm_edit_user.reset();
  }
  edit_user(user: any) {
    this.loading_edit_user = true;
    this.api.taf_post("user/edit", user, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_user.emit({
          new_data: JSON.parse(user.data)
        })
        console.log("Opération effectuée avec succés sur la table user. Réponse= ", reponse);
        this.onReset_edit_user()
        alert("Opération effectuée avec succés sur la table user")
      } else {
        console.log("L'opération sur la table user a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_user = false;
    }, (error: any) => {
      this.loading_edit_user = false;
    })
  }
  get_details_add_user_form() {
    this.loading_get_details_add_user_form = true;
    this.api.taf_post("user/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table user. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table user a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_user_form = false;
    }, (error: any) => {
      this.loading_get_details_add_user_form = false;
    })
  }
}
