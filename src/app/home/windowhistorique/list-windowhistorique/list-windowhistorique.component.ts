import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-windowhistorique',
  templateUrl: './list-windowhistorique.component.html',
  styleUrls: ['./list-windowhistorique.component.css']
})
export class ListWindowhistoriqueComponent {
  loading_get_windowhistorique = false
  les_windowhistoriques: any[] = []
  selected_windowhistorique: any = undefined
  windowhistorique_to_edit: any = undefined
  loading_delete_windowhistorique = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_windowhistorique()
  }
  get_windowhistorique() {
    this.loading_get_windowhistorique = true;
    this.api.taf_post("windowhistorique/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_windowhistoriques = reponse.data
        console.log("Opération effectuée avec succés sur la table windowhistorique. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table windowhistorique a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_windowhistorique = false;
    }, (error: any) => {
      this.loading_get_windowhistorique = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_windowhistoriques.unshift(event.windowhistorique)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_windowhistoriques[this.les_windowhistoriques.indexOf(this.windowhistorique_to_edit)]=params.new_data
  }
  voir_plus(one_windowhistorique: any) {
    this.selected_windowhistorique = one_windowhistorique
  }
  on_click_edit(one_windowhistorique: any) {
    this.windowhistorique_to_edit = one_windowhistorique
  }
  on_close_modal_edit(){
    this.windowhistorique_to_edit=undefined
  }
  delete_windowhistorique (windowhistorique : any){
    this.loading_delete_windowhistorique = true;
    this.api.taf_post("windowhistorique/delete", windowhistorique,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table windowhistorique . Réponse = ",reponse)
        this.get_windowhistorique()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table windowhistorique  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_windowhistorique = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_windowhistorique = false;
    })
  }
}