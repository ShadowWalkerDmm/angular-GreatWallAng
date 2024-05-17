
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-doorstatus',
  templateUrl: './edit-doorstatus.component.html',
  styleUrls: ['./edit-doorstatus.component.css']
})
export class EditDoorstatusComponent implements OnChanges {
  reactiveForm_edit_doorstatus !: FormGroup;
  submitted: boolean = false
  loading_edit_doorstatus: boolean = false
  @Input()  doorstatus_to_edit: any = {}
  @Output()
  cb_edit_doorstatus = new EventEmitter()
  form_details: any = {}
  door_statut : any = {}
  loading_get_details_add_doorstatus_form = false
  loading_add_doorhistorique: boolean = false;
  state!: string
  constructor(private formBuilder: FormBuilder, public api: ApiService) {
  }
  ngOnInit(): void {
    this.door_statut = this.doorstatus_to_edit
    this.get_details_add_doorstatus_form()
    this.update_form(this.door_statut)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.door_statut = changes["doorstatus_to_edit"].currentValue
    this.door_statut.state = this.door_statut.state == "opened" ? "closed" : "opened"
    console.log("door_statut:",this.door_statut)
    this.update_form(this.door_statut)
  }
  // mise à jour du formulaire
  update_form(doorstatus_to_edit: any) {
    this.reactiveForm_edit_doorstatus = this.formBuilder.group({
      name: [doorstatus_to_edit.name, Validators.required],
      state: [doorstatus_to_edit.state, Validators.required],
      // dateTime: [doorstatus_to_edit.dateTime, Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_doorstatus.controls; }
  // validation du formulaire
  onSubmit_edit_doorstatus() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_doorstatus.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_doorstatus.invalid) {
      return;
    }
    var doorstatus = this.reactiveForm_edit_doorstatus.value
    this.edit_doorstatus({
      condition: JSON.stringify({ id: this.doorstatus_to_edit.id }),
      data: JSON.stringify(doorstatus)
    })
    let doorhistorique = {
      idUser:this.api.token.user_connected.id,
      idDoor:this.door_statut.id,
      state:this.door_statut.state
    }
    console.log("doorhistorique",doorhistorique)
    this.add_doorhistorique(doorhistorique)
  }
  // vider le formulaire
  onReset_edit_doorstatus() {
    this.submitted = false;
    this.reactiveForm_edit_doorstatus.reset();
  }
  edit_doorstatus(doorstatus: any) {
    this.loading_edit_doorstatus = true;
    this.api.taf_post("doorstatus/edit", doorstatus, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_doorstatus.emit({
          new_data: JSON.parse(doorstatus.data)
        })
        console.log("Opération effectuée avec succés sur la table doorstatus. Réponse= ", reponse);
        this.onReset_edit_doorstatus()
        alert("Opération effectuée avec succés sur la table doorstatus")
      } else {
        console.log("L'opération sur la table doorstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_doorstatus = false;
    }, (error: any) => {
      this.loading_edit_doorstatus = false;
    })
  }
  get_details_add_doorstatus_form() {
    this.loading_get_details_add_doorstatus_form = true;
    this.api.taf_post("doorstatus/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table doorstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table doorstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_doorstatus_form = false;
    }, (error: any) => {
      this.loading_get_details_add_doorstatus_form = false;
    })
  }


  add_doorhistorique(doorhistorique: any) {
    this.loading_add_doorhistorique = true;
    this.api.taf_post("doorhistorique/add", doorhistorique, (reponse: any) => {
    this.loading_add_doorhistorique = false;
    if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table doorhistorique. Réponse= ", reponse);
        // alert("Opération éffectuée avec succés")
    } else {
        console.log("L'opération sur la table doorhistorique a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
    }
  }, (error: any) => {
      this.loading_add_doorhistorique = false;
  })
}

}
