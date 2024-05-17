
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-windowstatus',
  templateUrl: './edit-windowstatus.component.html',
  styleUrls: ['./edit-windowstatus.component.css']
})
export class EditWindowstatusComponent {
  reactiveForm_edit_windowstatus !: FormGroup;
  submitted: boolean = false
  loading_edit_windowstatus: boolean = false
  @Input()
  windowstatus_to_edit: any = {}
  @Output()
  cb_edit_windowstatus = new EventEmitter()
  form_details: any = {}
  loading_get_details_add_windowstatus_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
    this.get_details_add_windowstatus_form()
    this.update_form(this.windowstatus_to_edit)
  }
  // mise à jour du formulaire
  update_form(windowstatus_to_edit: any) {
    this.reactiveForm_edit_windowstatus = this.formBuilder.group({
      name: [windowstatus_to_edit.name, Validators.required],
      status: [windowstatus_to_edit.status, Validators.required],
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_windowstatus.controls; }
  // validation du formulaire
  onSubmit_edit_windowstatus() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_windowstatus.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_windowstatus.invalid) {
      return;
    }
    var windowstatus = this.reactiveForm_edit_windowstatus.value
    this.edit_windowstatus({
      condition: JSON.stringify({ id: this.windowstatus_to_edit.id }),
      data: JSON.stringify(windowstatus)
    })
  }
  // vider le formulaire
  onReset_edit_windowstatus() {
    this.submitted = false;
    this.reactiveForm_edit_windowstatus.reset();
  }
  edit_windowstatus(windowstatus: any) {
    this.loading_edit_windowstatus = true;
    this.api.taf_post("windowstatus/edit", windowstatus, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_windowstatus.emit({
          new_data: JSON.parse(windowstatus.data)
        })
        console.log("Opération effectuée avec succés sur la table windowstatus. Réponse= ", reponse);
        this.onReset_edit_windowstatus()
        alert("Opération effectuée avec succés sur la table windowstatus")
      } else {
        console.log("L'opération sur la table windowstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_windowstatus = false;
    }, (error: any) => {
      this.loading_edit_windowstatus = false;
    })
  }
  get_details_add_windowstatus_form() {
    this.loading_get_details_add_windowstatus_form = true;
    this.api.taf_post("windowstatus/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table windowstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table windowstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_windowstatus_form = false;
    }, (error: any) => {
      this.loading_get_details_add_windowstatus_form = false;
    })
  }
}
