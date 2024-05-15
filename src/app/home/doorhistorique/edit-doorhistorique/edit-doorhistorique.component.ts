
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-doorhistorique',
  templateUrl: './edit-doorhistorique.component.html',
  styleUrls: ['./edit-doorhistorique.component.css']
})
export class EditDoorhistoriqueComponent {
  reactiveForm_edit_doorhistorique !: FormGroup;
  submitted: boolean = false
  loading_edit_doorhistorique: boolean = false
  @Input()
  doorhistorique_to_edit: any = {}
  @Output()
  cb_edit_doorhistorique=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_doorhistorique_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_doorhistorique_form()
      this.update_form(this.doorhistorique_to_edit)
  }
  // mise à jour du formulaire
  update_form(doorhistorique_to_edit:any) {
      this.reactiveForm_edit_doorhistorique = this.formBuilder.group({
          state : [doorhistorique_to_edit.state, Validators.required],
updated_at : [doorhistorique_to_edit.updated_at, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_doorhistorique .controls; }
  // validation du formulaire
  onSubmit_edit_doorhistorique() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_doorhistorique.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_doorhistorique.invalid) {
          return;
      }
      var doorhistorique = this.reactiveForm_edit_doorhistorique.value
      this.edit_doorhistorique({
      condition:JSON.stringify({id_doorhistorique:this.doorhistorique_to_edit.id_doorhistorique}),
      data:JSON.stringify(doorhistorique)
      })
  }
  // vider le formulaire
  onReset_edit_doorhistorique() {
      this.submitted = false;
      this.reactiveForm_edit_doorhistorique.reset();
  }
  edit_doorhistorique(doorhistorique: any) {
      this.loading_edit_doorhistorique = true;
      this.api.taf_post("doorhistorique/edit", doorhistorique, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_doorhistorique.emit({
                  new_data:JSON.parse(doorhistorique.data)
              })
              console.log("Opération effectuée avec succés sur la table doorhistorique. Réponse= ", reponse);
              this.onReset_edit_doorhistorique()
              alert("Opération effectuée avec succés sur la table doorhistorique")
          } else {
              console.log("L'opération sur la table doorhistorique a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_doorhistorique = false;
      }, (error: any) => {
          this.loading_edit_doorhistorique = false;
      })
  }
  get_details_add_doorhistorique_form() {
      this.loading_get_details_add_doorhistorique_form = true;
      this.api.taf_post("doorhistorique/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table doorhistorique. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table doorhistorique a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_doorhistorique_form = false;
      }, (error: any) => {
      this.loading_get_details_add_doorhistorique_form = false;
    })
  }
}
