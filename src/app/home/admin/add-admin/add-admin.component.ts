
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  @Output()
  cb_add_admin=new EventEmitter()
  reactiveForm_add_admin !: FormGroup;
  submitted:boolean=false
  loading_add_admin :boolean=false
  form_details: any = {}
  loading_get_details_add_admin_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_admin_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_admin  = this.formBuilder.group({
          firstName: ["", Validators.required],
lastName: ["", Validators.required],
email: ["", Validators.required],
phone: ["", Validators.required],
password: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_admin .controls; }
  // validation du formulaire
  onSubmit_add_admin () {
      this.submitted = true;
      console.log(this.reactiveForm_add_admin .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_admin .invalid) {
          return;
      }
      var admin =this.reactiveForm_add_admin .value
      this.add_admin (admin )
  }
  // vider le formulaire
  onReset_add_admin () {
      this.submitted = false;
      this.reactiveForm_add_admin .reset();
  }
  add_admin(admin: any) {
      this.loading_add_admin = true;
      this.api.taf_post("admin/add", admin, (reponse: any) => {
      this.loading_add_admin = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table admin. Réponse= ", reponse);
          this.onReset_add_admin()
          alert("Opération éffectuée avec succés")
          this.cb_add_admin.emit({
            status:true,
            admin:reponse.data
          })
      } else {
          console.log("L'opération sur la table admin a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_admin = false;
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
