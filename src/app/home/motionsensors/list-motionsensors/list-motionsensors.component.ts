import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';

@Component({
  selector: 'app-list-motionsensors',
  templateUrl: './list-motionsensors.component.html',
  styleUrls: ['./list-motionsensors.component.css'],

})
export class ListMotionsensorsComponent {

  motionDetected = false;
  show_historique = false;

  loading_get_motionsensors = false
  les_motionsensorss: any[] = []
  selected_motionsensors: any = undefined
  motionsensors_to_edit: any = undefined
  loading_delete_motionsensors = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_motionsensors()
  }
  get_motionsensors() {
    this.loading_get_motionsensors = true;
    this.api.taf_post("motionsensors/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_motionsensorss = reponse.data
        console.log("datas: ",this.les_motionsensorss[0].state)
        if (this.les_motionsensorss[0].state == "Motion detected!"){
          setInterval(() => {
            this.motionDetected = true;
          }, 2000); // Update every 2 seconds
        }
        console.log("Opération effectuée avec succés sur la table motionsensors. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table motionsensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_motionsensors = false;
    }, (error: any) => {
      this.loading_get_motionsensors = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_motionsensorss.unshift(event.motionsensors)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_motionsensorss[this.les_motionsensorss.indexOf(this.motionsensors_to_edit)] = params.new_data
  }
  voir_plus(one_motionsensors: any) {
    this.selected_motionsensors = one_motionsensors
  }
  on_click_edit(one_motionsensors: any) {
    this.motionsensors_to_edit = one_motionsensors
  }
  on_close_modal_edit() {
    this.motionsensors_to_edit = undefined
  }
  delete_motionsensors(motionsensors: any) {
    this.loading_delete_motionsensors = true;
    this.api.taf_post("motionsensors/delete", motionsensors, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table motionsensors . Réponse = ", reponse)
        this.get_motionsensors()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table motionsensors  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_motionsensors = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_motionsensors = false;
      })
  }

  show(){
    this.show_historique = !this.show_historique;
  }
}