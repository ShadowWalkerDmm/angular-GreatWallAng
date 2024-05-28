
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-camera',
  templateUrl: './edit-camera.component.html',
  styleUrls: ['./edit-camera.component.css']
})
export class EditCameraComponent {
  reactiveForm_edit_camera !: FormGroup;
  submitted: boolean = false
  loading_edit_camera: boolean = false
  @Input()
  camera_to_edit: any = {}
  @Output()
  cb_edit_camera = new EventEmitter()
  form_details: any = {}
  loading_get_details_add_camera_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
    this.get_details_add_camera_form()
    this.update_form(this.camera_to_edit)
  }
  // mise à jour du formulaire
  update_form(camera_to_edit: any) {
    this.reactiveForm_edit_camera = this.formBuilder.group({
      name: [camera_to_edit.name, Validators.required],
      link: [camera_to_edit.link, Validators.required],
      // added_at: [camera_to_edit.added_at, Validators.required]
    });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_camera.controls; }
  // validation du formulaire
  onSubmit_edit_camera() {
    this.submitted = true;
    console.log(this.reactiveForm_edit_camera.value)
    // stop here if form is invalid
    if (this.reactiveForm_edit_camera.invalid) {
      return;
    }
    var camera = this.reactiveForm_edit_camera.value
    this.edit_camera({
      condition: JSON.stringify({ id_camera: this.camera_to_edit.id_camera }),
      data: JSON.stringify(camera)
    })
  }
  // vider le formulaire
  onReset_edit_camera() {
    this.submitted = false;
    this.reactiveForm_edit_camera.reset();
  }
  edit_camera(camera: any) {
    this.loading_edit_camera = true;
    this.api.taf_post("camera/edit", camera, (reponse: any) => {
      if (reponse.status) {
        this.cb_edit_camera.emit({
          new_data: JSON.parse(camera.data)
        })
        console.log("Opération effectuée avec succés sur la table camera. Réponse= ", reponse);
        this.onReset_edit_camera()
        alert("Opération effectuée avec succés sur la table camera")
      } else {
        console.log("L'opération sur la table camera a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_edit_camera = false;
    }, (error: any) => {
      this.loading_edit_camera = false;
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
