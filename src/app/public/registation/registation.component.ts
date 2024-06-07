import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'app-registation',
  // standalone: true,
  // imports: [],
  templateUrl: './registation.component.html',
  styleUrl: './registation.component.css'
})
export class RegistationComponent {
  @Output()
  cb_add_user = new EventEmitter()
  reactiveForm_add_user !: FormGroup;
  submitted: boolean = false
  loading_add_user: boolean = false
  form_details: any = {}
  loading_get_details_add_user_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    // this.get_details_add_user_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_user = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      phone: ["", Validators.required],
      relationship: ["", Validators.required],
      // authority_id: ["", Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_user.controls; }
  // validation du formulaire
  onSubmit_add_user() {
    this.submitted = true;
    console.log(this.reactiveForm_add_user.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_user.invalid) {
      return;
    }
    var user = this.reactiveForm_add_user.value
    this.add_user(user)
  }
  // vider le formulaire
  onReset_add_user() {
    this.submitted = false;
    this.reactiveForm_add_user.reset();
  }
  add_user(user: any) {
    this.loading_add_user = true;
    this.api.taf_post("user/add", user, (reponse: any) => {
      this.loading_add_user = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table user. Réponse= ", reponse);
        this.onReset_add_user()
        alert("Opération éffectuée avec succés")
        this.cb_add_user.emit({
          status: true,
          user: reponse.data
        })
      } else {
        console.log("L'opération sur la table user a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_user = false;
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
