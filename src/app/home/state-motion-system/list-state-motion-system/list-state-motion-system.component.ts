import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-state-motion-system',
  templateUrl: './list-state-motion-system.component.html',
  styleUrls: ['./list-state-motion-system.component.css']
})
export class ListStateMotionSystemComponent {
  loading_get_stateMotionSystem = false
  les_stateMotionSystems: any[] = []
  selected_stateMotionSystem: any = undefined
  stateMotionSystem_to_edit: any = undefined
  loading_delete_stateMotionSystem = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_stateMotionSystem()
  }
  get_stateMotionSystem() {
    this.loading_get_stateMotionSystem = true;
    this.api.taf_post("stateMotionSystem/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_stateMotionSystems = reponse.data
        console.log("Opération effectuée avec succés sur la table stateMotionSystem. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table stateMotionSystem a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_stateMotionSystem = false;
    }, (error: any) => {
      this.loading_get_stateMotionSystem = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_stateMotionSystems.unshift(event.stateMotionSystem)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_stateMotionSystems[this.les_stateMotionSystems.indexOf(this.stateMotionSystem_to_edit)]=params.new_data
  }
  on_click_edit(one_stateMotionSystem: any) {
    this.stateMotionSystem_to_edit = one_stateMotionSystem
  }
  on_close_modal_edit(){
    this.stateMotionSystem_to_edit=undefined
  }
  voir_plus(one_stateMotionSystem: any) {
    this.selected_stateMotionSystem = one_stateMotionSystem
  }
  delete_stateMotionSystem (stateMotionSystem : any){
    this.loading_delete_stateMotionSystem = true;
    this.api.taf_post("stateMotionSystem/delete", stateMotionSystem,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table stateMotionSystem . Réponse = ",reponse)
        this.get_stateMotionSystem()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table stateMotionSystem  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_stateMotionSystem = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_stateMotionSystem = false;
    })
  }
}