import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent {
  loading_get_admin = false
  les_admins: any[] = []
  selected_admin: any = undefined
  admin_to_edit: any = undefined
  loading_delete_admin = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_admin()
  }
  get_admin() {
    this.loading_get_admin = true;
    this.api.taf_post("admin/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_admins = reponse.data
        console.log("Opération effectuée avec succés sur la table admin. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table admin a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_admin = false;
    }, (error: any) => {
      this.loading_get_admin = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_admins.unshift(event.admin)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_admins[this.les_admins.indexOf(this.admin_to_edit)]=params.new_data
  }
  voir_plus(one_admin: any) {
    this.selected_admin = one_admin
  }
  on_click_edit(one_admin: any) {
    this.admin_to_edit = one_admin
  }
  on_close_modal_edit(){
    this.admin_to_edit=undefined
  }
  delete_admin (admin : any){
    this.loading_delete_admin = true;
    this.api.taf_post("admin/delete", admin,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table admin . Réponse = ",reponse)
        this.get_admin()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table admin  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_admin = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_admin = false;
    })
  }
}