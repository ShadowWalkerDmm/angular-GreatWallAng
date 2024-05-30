import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-motionsensors',
  templateUrl: './list-motionsensors.component.html',
  styleUrls: ['./list-motionsensors.component.css'],

})
export class ListMotionsensorsComponent {

  motionDetected = false;
  show_historique = false;
  loading_get_motionsensors = false
  les_motionsensorss: any[] = []
  // filterData: any[] = [];
  selected_motionsensors: any = undefined
  motionsensors_to_edit: any = undefined
  loading_delete_motionsensors = false

  constructor(public api: ApiService) {

  }

  ngOnInit(): void {
    this.get_motionsensors()
  }

  get_motionsensors() {
    this.loading_get_motionsensors = true;
    this.api.taf_post("motionsensors/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_motionsensorss = reponse.data
        // console.log("datas: ",this.les_motionsensorss[0].state)
        if (this.les_motionsensorss[0].state == "Motion detected!"){
          setInterval(() => {
            this.motionDetected = true;
          }, 2000); // Update every 2 seconds
        }
        console.log("Opération effectuée avec succés sur la table motionsensors.");
      } else {
        console.log("L'opération sur la table motionsensors a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_motionsensors = false;
    }, (error: any) => {
      this.loading_get_motionsensors = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_motionsensorss.unshift(event.motionsensors)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_motionsensorss[this.les_motionsensorss.indexOf(this.motionsensors_to_edit)] = params.new_data
  }
  voir_plus(one_motionsensors: any) {
    this.selected_motionsensors = one_motionsensors
  }
  on_click_edit(one_motionsensors: any) {
    this.motionsensors_to_edit = one_motionsensors
  }
  on_close_modal_edit() {
    this.motionsensors_to_edit = undefined
  }
  delete_motionsensors(motionsensors: any) {
    this.loading_delete_motionsensors = true;
    this.api.taf_post("motionsensors/delete", motionsensors, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table motionsensors . Réponse = ", reponse)
        this.get_motionsensors()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table motionsensors  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_motionsensors = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_motionsensors = false;
      })
  }

  show(){
    this.show_historique = !this.show_historique;
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


  filteredData = this.les_motionsensorss;
  DT = ""

  filterCriteria = {
    states: '',
    dateFrom: '',
    dateTo: '',
  };

  filterData() {
    this.filteredData = this.les_motionsensorss.filter(motionsensors => {
      const matchesState = this.filterCriteria.states ? motionsensors.state === this.filterCriteria.states : true;
      const matchesDate = this.filterCriteria.dateFrom && this.filterCriteria.dateTo ?
      this.isWithinDateRange(motionsensors.dateTime, this.filterCriteria.dateFrom, this.filterCriteria.dateTo) : true;
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