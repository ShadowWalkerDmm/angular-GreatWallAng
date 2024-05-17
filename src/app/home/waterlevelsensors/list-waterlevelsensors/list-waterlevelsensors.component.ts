import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-waterlevelsensors',
  templateUrl: './list-waterlevelsensors.component.html',
  styleUrls: ['./list-waterlevelsensors.component.css']
})
export class ListWaterlevelsensorsComponent {
  loading_get_waterlevelsensors = false
  les_waterlevelsensorss: any[] = []
  selected_waterlevelsensors: any = undefined
  waterlevelsensors_to_edit: any = undefined
  loading_delete_waterlevelsensors = false
  @ViewChild('closeWaterLevelModal') closeWaterLevelModal!: ElementRef;
  @ViewChild('closeEditWaterLevelModal') closeEditWaterLevelModal!: ElementRef;
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_waterlevelsensors()
  }
  get_waterlevelsensors() {
    this.loading_get_waterlevelsensors = true;
    this.api.taf_post("waterlevelsensors/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_waterlevelsensorss = reponse.data
        console.log("Opération effectuée avec succés sur la table waterlevelsensors. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table waterlevelsensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_waterlevelsensors = false;
    }, (error: any) => {
      this.loading_get_waterlevelsensors = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.closeWaterLevelModal.nativeElement.click();
      this.les_waterlevelsensorss.unshift(event.waterlevelsensors)
      this.get_waterlevelsensors()
    } else {

    }
  }
  after_edit(params: any) {
    this.closeEditWaterLevelModal.nativeElement.click();
    this.les_waterlevelsensorss[this.les_waterlevelsensorss.indexOf(this.waterlevelsensors_to_edit)]=params.new_data
    this.get_waterlevelsensors()
  }
  voir_plus(one_waterlevelsensors: any) {
    this.selected_waterlevelsensors = one_waterlevelsensors
  }
  on_click_edit(one_waterlevelsensors: any) {
    this.waterlevelsensors_to_edit = one_waterlevelsensors
  }
  on_close_modal_edit(){
    this.waterlevelsensors_to_edit=undefined
  }
  delete_waterlevelsensors (waterlevelsensors : any){
    this.loading_delete_waterlevelsensors = true;
    this.api.taf_post("waterlevelsensors/delete", waterlevelsensors,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table waterlevelsensors . Réponse = ",reponse)
        this.get_waterlevelsensors()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table waterlevelsensors  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_waterlevelsensors = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_waterlevelsensors = false;
    })
  }
}