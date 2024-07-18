
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-node-red',
  templateUrl: './add-node-red.component.html',
  styleUrls: ['./add-node-red.component.css']
})
export class AddNodeRedComponent {
  @Output()
  cb_add_node_red = new EventEmitter()
  reactiveForm_add_node_red !: FormGroup;
  submitted: boolean = false
  loading_add_node_red: boolean = false
  form_details: any = {}
  loading_get_details_add_node_red_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_node_red_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_node_red = this.formBuilder.group({
      link: ["", Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_node_red.controls; }
  // validation du formulaire
  onSubmit_add_node_red() {
    this.submitted = true;
    console.log(this.reactiveForm_add_node_red.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_node_red.invalid) {
      return;
    }
    // var node_red = this.reactiveForm_add_node_red.value
    this.api.node_red_base_url = this.reactiveForm_add_node_red.value
    this.add_node_red(this.api.node_red_base_url)
  }
  // vider le formulaire
  onReset_add_node_red() {
    this.submitted = false;
    this.reactiveForm_add_node_red.reset();
  }
  add_node_red(node_red: any) {
    this.loading_add_node_red = true;
    this.api.taf_post("node_red/add", node_red, (reponse: any) => {
      this.loading_add_node_red = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table node_red. Réponse= ", reponse);
        this.onReset_add_node_red()
        alert("Opération éffectuée avec succés")
        this.cb_add_node_red.emit({
          status: true,
          node_red: reponse.data
        })
      } else {
        console.log("L'opération sur la table node_red a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_node_red = false;
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
