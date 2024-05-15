import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-authority',
  templateUrl: './list-authority.component.html',
  styleUrls: ['./list-authority.component.css']
})
export class ListAuthorityComponent {
  loading_get_authority = false
  les_authoritys: any[] = []
  selected_authority: any = undefined
  authority_to_edit: any = undefined
  loading_delete_authority = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_authority()
  }
  get_authority() {
    this.loading_get_authority = true;
    this.api.taf_post("authority/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_authoritys = reponse.data
        console.log("Opération effectuée avec succés sur la table authority. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table authority a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_authority = false;
    }, (error: any) => {
      this.loading_get_authority = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_authoritys.unshift(event.authority)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_authoritys[this.les_authoritys.indexOf(this.authority_to_edit)]=params.new_data
  }
  voir_plus(one_authority: any) {
    this.selected_authority = one_authority
  }
  on_click_edit(one_authority: any) {
    this.authority_to_edit = one_authority
  }
  on_close_modal_edit(){
    this.authority_to_edit=undefined
  }
  delete_authority (authority : any){
    this.loading_delete_authority = true;
    this.api.taf_post("authority/delete", authority,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table authority . Réponse = ",reponse)
        this.get_authority()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table authority  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_authority = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_authority = false;
    })
  }
}