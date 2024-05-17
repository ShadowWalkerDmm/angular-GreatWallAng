import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  loading_get_user = false
  les_users: any[] = []
  selected_user: any = undefined
  user_to_edit: any = undefined
  loading_delete_user = false
  @ViewChild('closeUserModal') closeUserModal!: ElementRef;
  @ViewChild('closeEditUserModal') closeEditUserModal!: ElementRef;
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_user()
  }
  get_user() {
    this.loading_get_user = true;
    this.api.taf_post("user/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_users = reponse.data
        console.log("Opération effectuée avec succés sur la table user. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table user a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_user = false;
    }, (error: any) => {
      this.loading_get_user = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.closeUserModal.nativeElement.click();
      this.les_users.unshift(event.user)
      this.get_user()
    } else {

    }
  }
  after_edit(params: any) {
    this.closeEditUserModal.nativeElement.click();
    this.les_users[this.les_users.indexOf(this.user_to_edit)]=params.new_data
    this.get_user()
  }
  voir_plus(one_user: any) {
    this.selected_user = one_user
  }
  on_click_edit(one_user: any) {
    this.user_to_edit = one_user
  }
  on_close_modal_edit(){
    this.user_to_edit=undefined
  }
  delete_user (user : any){
    this.loading_delete_user = true;
    this.api.taf_post("user/delete", user,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table user . Réponse = ",reponse)
        this.get_user()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table user  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_user = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_user = false;
    })
  }
}