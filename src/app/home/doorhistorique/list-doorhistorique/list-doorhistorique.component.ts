import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-doorhistorique',
  templateUrl: './list-doorhistorique.component.html',
  styleUrls: ['./list-doorhistorique.component.css']
})
export class ListDoorhistoriqueComponent {
  loading_get_doorhistorique = false
  les_doorhistoriques: any[] = []
  selected_doorhistorique: any = undefined
  doorhistorique_to_edit: any = undefined
  loading_delete_doorhistorique = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_doorhistorique()
  }
  get_doorhistorique() {
    this.loading_get_doorhistorique = true;
    this.api.taf_post("doorhistorique/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_doorhistoriques = reponse.data
        console.log("Opération effectuée avec succés sur la table doorhistorique. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table doorhistorique a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_doorhistorique = false;
    }, (error: any) => {
      this.loading_get_doorhistorique = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_doorhistoriques.unshift(event.doorhistorique)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_doorhistoriques[this.les_doorhistoriques.indexOf(this.doorhistorique_to_edit)]=params.new_data
  }
  voir_plus(one_doorhistorique: any) {
    this.selected_doorhistorique = one_doorhistorique
  }
  on_click_edit(one_doorhistorique: any) {
    this.doorhistorique_to_edit = one_doorhistorique
  }
  on_close_modal_edit(){
    this.doorhistorique_to_edit=undefined
  }
  delete_doorhistorique (doorhistorique : any){
    this.loading_delete_doorhistorique = true;
    this.api.taf_post("doorhistorique/delete", doorhistorique,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table doorhistorique . Réponse = ",reponse)
        this.get_doorhistorique()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table doorhistorique  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_doorhistorique = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_doorhistorique = false;
    })
  }
}