import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-smokesensors',
  templateUrl: './list-smokesensors.component.html',
  styleUrls: ['./list-smokesensors.component.css']
})
export class ListSmokesensorsComponent {
  loading_get_smokesensors = false
  les_smokesensorss: any[] = []
  selected_smokesensors: any = undefined
  smokesensors_to_edit: any = undefined
  loading_delete_smokesensors = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_smokesensors()
  }
  get_smokesensors() {
    this.loading_get_smokesensors = true;
    this.api.taf_post("smokesensors/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_smokesensorss = reponse.data
        console.log("Opération effectuée avec succés sur la table smokesensors. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table smokesensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_smokesensors = false;
    }, (error: any) => {
      this.loading_get_smokesensors = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_smokesensorss.unshift(event.smokesensors)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_smokesensorss[this.les_smokesensorss.indexOf(this.smokesensors_to_edit)]=params.new_data
  }
  voir_plus(one_smokesensors: any) {
    this.selected_smokesensors = one_smokesensors
  }
  on_click_edit(one_smokesensors: any) {
    this.smokesensors_to_edit = one_smokesensors
  }
  on_close_modal_edit(){
    this.smokesensors_to_edit=undefined
  }
  delete_smokesensors (smokesensors : any){
    this.loading_delete_smokesensors = true;
    this.api.taf_post("smokesensors/delete", smokesensors,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table smokesensors . Réponse = ",reponse)
        this.get_smokesensors()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table smokesensors  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_smokesensors = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_smokesensors = false;
    })
  }
}