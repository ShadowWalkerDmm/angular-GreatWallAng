import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-node-red',
  templateUrl: './list-node-red.component.html',
  styleUrls: ['./list-node-red.component.css']
})
export class ListNodeRedComponent {
  loading_get_node_red = false
  les_node_reds: any[] = []
  selected_node_red: any = undefined
  node_red_to_edit: any = undefined
  loading_delete_node_red = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_node_red()
  }
  get_node_red() {
    this.loading_get_node_red = true;
    this.api.taf_post("node_red/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_node_reds = reponse.data
        this.api.node_red_base_url = reponse.data[0].link
        console.log("Opération effectuée avec succés sur la table node_red. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table node_red a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_node_red = false;
    }, (error: any) => {
      this.loading_get_node_red = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_node_reds.unshift(event.node_red);
      this.get_node_red();
    } else {

    }
  }
  after_edit(params: any) {
    this.les_node_reds[this.les_node_reds.indexOf(this.node_red_to_edit)] = params.new_data
    this.get_node_red()
  }
  voir_plus(one_node_red: any) {
    this.selected_node_red = one_node_red
  }
  on_click_edit(one_node_red: any) {
    this.node_red_to_edit = one_node_red
  }
  on_close_modal_edit() {
    this.node_red_to_edit = undefined
  }
  delete_node_red(node_red: any) {
    this.loading_delete_node_red = true;
    this.api.taf_post("node_red/delete", node_red, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table node_red . Réponse = ", reponse)
        this.get_node_red()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table node_red  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_node_red = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_node_red = false;
      })
  }
}