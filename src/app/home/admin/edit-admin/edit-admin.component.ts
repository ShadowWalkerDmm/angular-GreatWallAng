
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {
  reactiveForm_edit_admin !: FormGroup;
  submitted: boolean = false
  loading_edit_admin: boolean = false
  @Input()
  admin_to_edit: any = {}
  @Output()
  cb_edit_admin=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_admin_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_admin_form()
      this.update_form(this.admin_to_edit)
  }
  // mise à jour du formulaire
  update_form(admin_to_edit:any) {
      this.reactiveForm_edit_admin = this.formBuilder.group({
          firstName : [admin_to_edit.firstName, Validators.required],
lastName : [admin_to_edit.lastName, Validators.required],
email : [admin_to_edit.email, Validators.required],
phone : [admin_to_edit.phone, Validators.required],
password : [admin_to_edit.password, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_admin .controls; }
  // validation du formulaire
  onSubmit_edit_admin() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_admin.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_admin.invalid) {
          return;
      }
      var admin = this.reactiveForm_edit_admin.value
      this.edit_admin({
      condition:JSON.stringify({id_admin:this.admin_to_edit.id_admin}),
      data:JSON.stringify(admin)
      })
  }
  // vider le formulaire
  onReset_edit_admin() {
      this.submitted = false;
      this.reactiveForm_edit_admin.reset();
  }
  edit_admin(admin: any) {
      this.loading_edit_admin = true;
      this.api.taf_post("admin/edit", admin, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_admin.emit({
                  new_data:JSON.parse(admin.data)
              })
              console.log("Opération effectuée avec succés sur la table admin. Réponse= ", reponse);
              this.onReset_edit_admin()
              alert("Opération effectuée avec succés sur la table admin")
          } else {
              console.log("L'opération sur la table admin a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_admin = false;
      }, (error: any) => {
          this.loading_edit_admin = false;
      })
  }
  get_details_add_admin_form() {
      this.loading_get_details_add_admin_form = true;
      this.api.taf_post("admin/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table admin. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table admin a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_admin_form = false;
      }, (error: any) => {
      this.loading_get_details_add_admin_form = false;
    })
  }
}
