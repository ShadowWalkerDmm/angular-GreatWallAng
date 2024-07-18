import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../service/api/api.service';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  menu: any = {
    titre: "Menu",
    items: [
      { libelle: "Doorstatus", path: "/home/doorstatus" },
      { libelle: "Motionsensors", path: "/home/motionsensors" },
      { libelle: "User", path: "/home/user" },
      { libelle: "Waterlevelsensors", path: "/home/waterlevelsensors" },
      { libelle: "Windowstatus", path: "/home/windowstatus" },
      { libelle: "SmokeSensors", path: "/home/smokesensors" },
      { libelle: "Camera", path: "/home/camera"}
    ]
  }

  // @ViewChild('offcanvas', { static: true }) offcanvas: ElementRef;

  authority_id: number = this.api.token.user_connected.authority_id

  constructor(public api: ApiService, public route: Router) {
  }
  ngOnInit(): void {
    // this.get_node_red()
  }

  onIconClick() {
    this.route.navigate(['/home'])

  }

  node_red_to_edit: any = undefined
  loading_get_node_red = false
  loading_get_user = false
  les_users: any[] = []
  selected_user: any = undefined
  user_to_edit: any = undefined
  loading_delete_user = false
  @ViewChild('closeEditUserModal') closeEditUserModal!: ElementRef;

  get_user() {
    this.loading_get_user = true;
    this.api.taf_post("user/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_users = reponse.data
        console.log("Opération effectuée avec succés sur la table user. Réponse= ", reponse.data);
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
      // this.closeUserModal.nativeElement.click();
      this.les_users.unshift(event.user)
      this.get_user()
    } else {

    }
  }
  after_edit(params: any) {
    this.closeEditUserModal.nativeElement.click();
    this.les_users[this.les_users.indexOf(this.user_to_edit)] = params.new_data
    // this.get_user()
  }
  voir_plus(one_user: any) {
    this.selected_user = one_user
  }
  on_click_edit(one_user: any) {
    this.user_to_edit = one_user
  }
  on_click_edit_url(one_node_red: any) {

    this.node_red_to_edit = one_node_red
  }
  on_close_modal_edit() {
    this.user_to_edit = undefined
  }
  delete_user(user: any) {
    this.loading_delete_user = true;
    this.api.taf_post("user/delete", user, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table user . Réponse = ", reponse)
        // this.get_user()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table user  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_user = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_user = false;
      })
  }

  // get_node_red() {
  //   this.loading_get_node_red = true;
  //   this.api.taf_post("node_red/get", {}, (reponse: any) => {
  //     if (reponse.status) {
  //       // this.les_node_reds = reponse.data
  //       this.api.node_red_base_url = reponse.data
  //       console.log("node_red_url_bd: ",reponse.data)
  //       console.log("Opération effectuée avec succés sur la table node_red. Réponse= ", reponse);
  //     } else {
  //       console.log("L'opération sur la table node_red a échoué. Réponse= ", reponse);
  //       alert("L'opération a echoué")
  //     }
  //     this.loading_get_node_red = false;
  //   }, (error: any) => {
  //     this.loading_get_node_red = false;
  //   })
  // }
}
