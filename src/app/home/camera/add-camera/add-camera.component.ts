
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.component.html',
  styleUrls: ['./add-camera.component.css']
})
export class AddCameraComponent {
  @Output()
  cb_add_camera = new EventEmitter()
  reactiveForm_add_camera !: FormGroup;
  submitted: boolean = false
  loading_add_camera: boolean = false
  form_details: any = {}
  loading_get_details_add_camera_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_camera_form()
    this.init_form()
  }
  init_form() {
    this.reactiveForm_add_camera = this.formBuilder.group({
      name: ["", Validators.required],
      link: ["", Validators.required],
      // added_at: ["", Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_camera.controls; }
  // validation du formulaire
  onSubmit_add_camera() {
    this.submitted = true;
    console.log(this.reactiveForm_add_camera.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_camera.invalid) {
      return;
    }
    var camera = this.reactiveForm_add_camera.value
    this.add_camera(camera)
  }
  // vider le formulaire
  onReset_add_camera() {
    this.submitted = false;
    this.reactiveForm_add_camera.reset();
  }
  add_camera(camera: any) {
    this.loading_add_camera = true;
    this.api.taf_post("camera/add", camera, (reponse: any) => {
      this.loading_add_camera = false;
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table camera. Réponse= ", reponse);
        this.onReset_add_camera()
        alert("Opération éffectuée avec succés")
        this.cb_add_camera.emit({
          status: true,
          camera: reponse.data
        })
      } else {
        console.log("L'opération sur la table camera a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
    }, (error: any) => {
      this.loading_add_camera = false;
    })
  }

  get_details_add_camera_form() {
    this.loading_get_details_add_camera_form = true;
    this.api.taf_post("camera/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table camera. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table camera a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_camera_form = false;
    }, (error: any) => {
      this.loading_get_details_add_camera_form = false;
    })
  }
}
