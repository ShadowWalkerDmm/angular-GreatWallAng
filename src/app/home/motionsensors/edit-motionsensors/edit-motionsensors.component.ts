
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-motionsensors',
  templateUrl: './edit-motionsensors.component.html',
  styleUrls: ['./edit-motionsensors.component.css']
})
export class EditMotionsensorsComponent {
  reactiveForm_edit_motionsensors !: FormGroup;
  submitted: boolean = false
  loading_edit_motionsensors: boolean = false
  @Input()
  motionsensors_to_edit: any = {}
  @Output()
  cb_edit_motionsensors=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_motionsensors_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_motionsensors_form()
      this.update_form(this.motionsensors_to_edit)
  }
  // mise à jour du formulaire
  update_form(motionsensors_to_edit:any) {
      this.reactiveForm_edit_motionsensors = this.formBuilder.group({
          state : [motionsensors_to_edit.state, Validators.required],
dateTime : [motionsensors_to_edit.dateTime, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_motionsensors .controls; }
  // validation du formulaire
  onSubmit_edit_motionsensors() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_motionsensors.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_motionsensors.invalid) {
          return;
      }
      var motionsensors = this.reactiveForm_edit_motionsensors.value
      this.edit_motionsensors({
      condition:JSON.stringify({id_motionsensors:this.motionsensors_to_edit.id_motionsensors}),
      data:JSON.stringify(motionsensors)
      })
  }
  // vider le formulaire
  onReset_edit_motionsensors() {
      this.submitted = false;
      this.reactiveForm_edit_motionsensors.reset();
  }
  edit_motionsensors(motionsensors: any) {
      this.loading_edit_motionsensors = true;
      this.api.taf_post("motionsensors/edit", motionsensors, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_motionsensors.emit({
                  new_data:JSON.parse(motionsensors.data)
              })
              console.log("Opération effectuée avec succés sur la table motionsensors. Réponse= ", reponse);
              this.onReset_edit_motionsensors()
              alert("Opération effectuée avec succés sur la table motionsensors")
          } else {
              console.log("L'opération sur la table motionsensors a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_motionsensors = false;
      }, (error: any) => {
          this.loading_edit_motionsensors = false;
      })
  }
  get_details_add_motionsensors_form() {
      this.loading_get_details_add_motionsensors_form = true;
      this.api.taf_post("motionsensors/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table motionsensors. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table motionsensors a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_motionsensors_form = false;
      }, (error: any) => {
      this.loading_get_details_add_motionsensors_form = false;
    })
  }
}
