
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-windowhistorique',
  templateUrl: './edit-windowhistorique.component.html',
  styleUrls: ['./edit-windowhistorique.component.css']
})
export class EditWindowhistoriqueComponent {
  reactiveForm_edit_windowhistorique !: FormGroup;
  submitted: boolean = false
  loading_edit_windowhistorique: boolean = false
  @Input()
  windowhistorique_to_edit: any = {}
  @Output()
  cb_edit_windowhistorique=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_windowhistorique_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_windowhistorique_form()
      this.update_form(this.windowhistorique_to_edit)
  }
  // mise à jour du formulaire
  update_form(windowhistorique_to_edit:any) {
      this.reactiveForm_edit_windowhistorique = this.formBuilder.group({
          idWindow : [windowhistorique_to_edit.idWindow, Validators.required],
state : [windowhistorique_to_edit.state, Validators.required],
uploadDate : [windowhistorique_to_edit.uploadDate, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_windowhistorique .controls; }
  // validation du formulaire
  onSubmit_edit_windowhistorique() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_windowhistorique.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_windowhistorique.invalid) {
          return;
      }
      var windowhistorique = this.reactiveForm_edit_windowhistorique.value
      this.edit_windowhistorique({
      condition:JSON.stringify({id_windowhistorique:this.windowhistorique_to_edit.id_windowhistorique}),
      data:JSON.stringify(windowhistorique)
      })
  }
  // vider le formulaire
  onReset_edit_windowhistorique() {
      this.submitted = false;
      this.reactiveForm_edit_windowhistorique.reset();
  }
  edit_windowhistorique(windowhistorique: any) {
      this.loading_edit_windowhistorique = true;
      this.api.taf_post("windowhistorique/edit", windowhistorique, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_windowhistorique.emit({
                  new_data:JSON.parse(windowhistorique.data)
              })
              console.log("Opération effectuée avec succés sur la table windowhistorique. Réponse= ", reponse);
              this.onReset_edit_windowhistorique()
              alert("Opération effectuée avec succés sur la table windowhistorique")
          } else {
              console.log("L'opération sur la table windowhistorique a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_windowhistorique = false;
      }, (error: any) => {
          this.loading_edit_windowhistorique = false;
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
