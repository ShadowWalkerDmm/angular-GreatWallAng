
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-node-red',
  templateUrl: './edit-node-red.component.html',
  styleUrls: ['./edit-node-red.component.css']
})
export class EditNodeRedComponent {
  reactiveForm_edit_node_red !: FormGroup;
  submitted: boolean = false
  loading_edit_node_red: boolean = false
  @Input()
  node_red_to_edit: any = {}
  @Output()
  cb_edit_node_red = new EventEmitter()
  form_details: any = {}
  loading_get_details_add_node_red_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
    this.get_details_add_node_red_form()
    this.update_form(this.node_red_to_edit)
  }
  // mise à jour du formulaire
  update_form(node_red_to_edit: any) {
    this.reactiveForm_edit_node_red = this.formBuilder.group({
      link: [node_red_to_edit.link, Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_node_red.controls; }
  // validation du formulaire
  onSubmit_edit_node_red() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_node_red.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_node_red.invalid) {
      return;
    }
    this.api.node_red_base_url = this.reactiveForm_edit_node_red.value
    var node_red = this.reactiveForm_edit_node_red.value
    this.edit_node_red({
      condition: JSON.stringify({ id_node_red: this.node_red_to_edit.id_node_red }),
      data: JSON.stringify(node_red)
    })
  }
  // vider le formulaire
  onReset_edit_node_red() {
    this.submitted = false;
    this.reactiveForm_edit_node_red.reset();
  }
  edit_node_red(node_red: any) {
    this.loading_edit_node_red = true;
    this.api.taf_post("node_red/edit", node_red, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_node_red.emit({
          new_data: JSON.parse(node_red.data)
        })
        console.log("Opération effectuée avec succés sur la table node_red. Réponse= ", reponse);
        this.onReset_edit_node_red()
        alert("Opération effectuée avec succés sur la table node_red")
      } else {
        console.log("L'opération sur la table node_red a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_node_red = false;
    }, (error: any) => {
      this.loading_edit_node_red = false;
    })
  }
  get_details_add_node_red_form() {
    this.loading_get_details_add_node_red_form = true;
    this.api.taf_post("node_red/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table node_red. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table node_red a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_node_red_form = false;
    }, (error: any) => {
      this.loading_get_details_add_node_red_form = false;
    })
  }
}
