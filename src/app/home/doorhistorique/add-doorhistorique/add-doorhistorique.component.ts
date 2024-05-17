
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-doorhistorique',
  templateUrl: './add-doorhistorique.component.html',
  styleUrls: ['./add-doorhistorique.component.css']
})
export class AddDoorhistoriqueComponent {
  @Output()
  cb_add_doorhistorique=new EventEmitter()
  @Input() idDoor! : number
  @Input() state! : string
  reactiveForm_add_doorhistorique !: FormGroup;
  submitted:boolean=false
  loading_add_doorhistorique :boolean=false
  form_details: any = {}
  loading_get_details_add_doorhistorique_form = false
  
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_doorhistorique_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_doorhistorique  = this.formBuilder.group({
        idUser:[ this.api.token.user_connected.id],
        idDoor:[this.idDoor],
        state: [this.state],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_doorhistorique .controls; }
  // validation du formulaire
  onSubmit_add_doorhistorique () {
      this.submitted = true;
      console.log(this.reactiveForm_add_doorhistorique .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_doorhistorique .invalid) {
          return;
      }
      var doorhistorique =this.reactiveForm_add_doorhistorique .value
      //this.add_doorhistorique (doorhistorique )
  }
  // vider le formulaire
  onReset_add_doorhistorique () {
      this.submitted = false;
      this.reactiveForm_add_doorhistorique .reset();
  }
  add_doorhistorique(doorhistorique: any) {
      this.loading_add_doorhistorique = true;
      this.api.taf_post("doorhistorique/add", doorhistorique, (reponse: any) => {
      this.loading_add_doorhistorique = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table doorhistorique. Réponse= ", reponse);
          this.onReset_add_doorhistorique()
          alert("Opération éffectuée avec succés")
          this.cb_add_doorhistorique.emit({
            status:true,
            doorhistorique:reponse.data
          })
      } else {
          console.log("L'opération sur la table doorhistorique a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_doorhistorique = false;
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
