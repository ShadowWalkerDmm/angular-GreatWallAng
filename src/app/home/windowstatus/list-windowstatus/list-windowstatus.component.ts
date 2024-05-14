import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-windowstatus',
  templateUrl: './list-windowstatus.component.html',
  styleUrls: ['./list-windowstatus.component.css']
})
export class ListWindowstatusComponent {
  loading_get_windowstatus = false
  les_windowstatuss: any[] = []
  selected_windowstatus: any = undefined
  windowstatus_to_edit: any = undefined
  loading_delete_windowstatus = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_windowstatus()
  }
  get_windowstatus() {
    this.loading_get_windowstatus = true;
    this.api.taf_post("windowstatus/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_windowstatuss = reponse.data
        console.log("Opération effectuée avec succés sur la table windowstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table windowstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_windowstatus = false;
    }, (error: any) => {
      this.loading_get_windowstatus = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_windowstatuss.unshift(event.windowstatus)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_windowstatuss[this.les_windowstatuss.indexOf(this.windowstatus_to_edit)]=params.new_data
  }
  voir_plus(one_windowstatus: any) {
    this.selected_windowstatus = one_windowstatus
  }
  on_click_edit(one_windowstatus: any) {
    this.windowstatus_to_edit = one_windowstatus
  }
  on_close_modal_edit(){
    this.windowstatus_to_edit=undefined
  }
  delete_windowstatus (windowstatus : any){
    this.loading_delete_windowstatus = true;
    this.api.taf_post("windowstatus/delete", windowstatus,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table windowstatus . Réponse = ",reponse)
        this.get_windowstatus()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table windowstatus  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_windowstatus = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_windowstatus = false;
    })
  }
}