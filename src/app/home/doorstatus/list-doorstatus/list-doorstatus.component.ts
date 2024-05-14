import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-doorstatus',
  templateUrl: './list-doorstatus.component.html',
  styleUrls: ['./list-doorstatus.component.css']
})
export class ListDoorstatusComponent {
  loading_get_doorstatus = false
  les_doorstatuss: any[] = []
  selected_doorstatus: any = undefined
  doorstatus_to_edit: any = undefined
  loading_delete_doorstatus = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_doorstatus()
  }
  get_doorstatus() {
    this.loading_get_doorstatus = true;
    this.api.taf_post("doorstatus/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_doorstatuss = reponse.data
        console.log("Opération effectuée avec succés sur la table doorstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table doorstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_doorstatus = false;
    }, (error: any) => {
      this.loading_get_doorstatus = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_doorstatuss.unshift(event.doorstatus)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_doorstatuss[this.les_doorstatuss.indexOf(this.doorstatus_to_edit)]=params.new_data
  }
  voir_plus(one_doorstatus: any) {
    this.selected_doorstatus = one_doorstatus
  }
  on_click_edit(one_doorstatus: any) {
    this.doorstatus_to_edit = one_doorstatus
  }
  on_close_modal_edit(){
    this.doorstatus_to_edit=undefined
  }
  delete_doorstatus (doorstatus : any){
    this.loading_delete_doorstatus = true;
    this.api.taf_post("doorstatus/delete", doorstatus,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table doorstatus . Réponse = ",reponse)
        this.get_doorstatus()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table doorstatus  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_doorstatus = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_doorstatus = false;
    })
  }
}