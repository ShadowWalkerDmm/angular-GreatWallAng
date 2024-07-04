import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-camera',
  templateUrl: './list-camera.component.html',
  styleUrls: ['./list-camera.component.css']
})
export class ListCameraComponent {
  authority_id: number = this.api.token.user_connected.authority_id
  loading_get_camera = false
  les_cameras: any[] = []
  selected_camera: any = undefined
  camera_to_edit: any = undefined
  loading_delete_camera = false
  currentStreamLink: any = "";
  currentStreamName: any = "";
  
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_camera()
  }
  get_camera() {
    this.loading_get_camera = true;
    this.api.taf_post("camera/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_cameras = reponse.data
        console.log("Opération effectuée avec succés sur la table camera. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table camera a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_camera = false;
    }, (error: any) => {
      this.loading_get_camera = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_cameras.unshift(event.camera)
    } else {

    }
  }

  after_edit(params: any) {
    this.les_cameras[this.les_cameras.indexOf(this.camera_to_edit)] = params.new_data
  }

  voir_plus(one_camera: any) {
    this.selected_camera = one_camera
  }

  on_click_edit(one_camera: any) {
    this.camera_to_edit = one_camera
  }

  on_close_modal_edit() {
    this.camera_to_edit = undefined
  }

  delete_camera(camera: any) {
    this.loading_delete_camera = true;
    this.api.taf_post("camera/delete", camera, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table camera . Réponse = ", reponse)
        this.get_camera()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table camera  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_camera = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_camera = false;
      })
  }

  trackByFn(index: number, item: any): number {
    return item.id_camera;
  }

  openStreamModal(link: string, name: string): void {
    this.currentStreamLink = link;
    this.currentStreamName = name;
    // console.log("currentStreamlink: ", this.currentStreamLink)
    // console.log("currentStreamlink: ", this.currentStreamName)
  }
}