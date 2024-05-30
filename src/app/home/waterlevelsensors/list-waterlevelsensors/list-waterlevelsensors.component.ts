import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-waterlevelsensors',
  templateUrl: './list-waterlevelsensors.component.html',
  styleUrls: ['./list-waterlevelsensors.component.css']
})
export class ListWaterlevelsensorsComponent {

  alert = false;
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
        if (this.les_waterlevelsensorss[this.les_waterlevelsensorss.length-1].state == "alert"){
          setInterval(() => {
            this.alert = true;
          }, 2000); // Update every 2 seconds
        }
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

  private offsetX: number = 0;
  private offsetY: number = 0;

  onDragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    this.offsetX = event.clientX - target.getBoundingClientRect().left;
    this.offsetY = event.clientY - target.getBoundingClientRect().top;
    event.dataTransfer?.setDragImage(new Image(), 0, 0); // Optionnel, cache l'image fantôme par défaut
  }

  onDragEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    const parentRect = target.parentElement?.getBoundingClientRect();
    if (parentRect) {
      const newX = event.clientX - parentRect.left - this.offsetX;
      const newY = event.clientY - parentRect.top - this.offsetY;
      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;
      target.style.position = 'absolute';
    }
  }


  filteredData = this.les_waterlevelsensorss;
  DT = ""

  filterCriteria = {
    states: '',
    dateFrom: '',
    dateTo: '',
  };

  filterData() {
    this.filteredData = this.les_waterlevelsensorss.filter(waterlevel => {
      const matchesState = this.filterCriteria.states ? waterlevel.state === this.filterCriteria.states : true;
      const matchesDate = this.filterCriteria.dateFrom && this.filterCriteria.dateTo ?
      this.isWithinDateRange(waterlevel.dateTime, this.filterCriteria.dateFrom, this.filterCriteria.dateTo) : true;
      return matchesState && matchesDate ;
    });
  }

  isWithinDateRange(DT: string, dateFrom: string, dateTo: string): boolean {
    const date = new Date(DT);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    return date >= fromDate && date <= toDate;
  }
}