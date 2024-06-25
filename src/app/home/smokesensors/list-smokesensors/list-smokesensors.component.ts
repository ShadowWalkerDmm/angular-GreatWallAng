import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { SocketService } from '../../../service/socket.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-list-smokesensors',
  templateUrl: './list-smokesensors.component.html',
  styleUrls: ['./list-smokesensors.component.css']
})
export class ListSmokesensorsComponent {

  alert = false;
  loading_get_smokesensors = false
  les_smokesensorss: any[] = []
  selected_smokesensors: any = undefined
  smokesensors_to_edit: any = undefined
  loading_delete_smokesensors = false

  private wsURL = 'ws://localhost:1880/ws/sensor';
  sensorData: any[] = [];
  latestSensorData: any = null; // Propriété pour stocker les dernières données reçues

  constructor(public api: ApiService, private wsService: SocketService) {

  }

  ngOnInit(): void {
    this.get_smokesensors()
  }

  get_smokesensors() {
    this.loading_get_smokesensors = true;
    this.api.taf_post("smokesensors/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_smokesensorss = reponse.data
        this.api.alertSmoke = this.les_smokesensorss[0].state === 'alert' || this.les_smokesensorss[0].state === 'stoped';
        // if (this.les_smokesensorss[this.les_smokesensorss.length - 1].state == "alert") {
        //   setInterval(() => {
        //     this.alert = true;
        //   }, 2000);// update every 2 seconds
        // }
        console.log("Opération effectuée avec succés sur la table smokesensors.");
      } else {
        console.log("L'opération sur la table smokesensors a échoué.");
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
    this.les_smokesensorss[this.les_smokesensorss.indexOf(this.smokesensors_to_edit)] = params.new_data
  }
  voir_plus(one_smokesensors: any) {
    this.selected_smokesensors = one_smokesensors
  }
  on_click_edit(one_smokesensors: any) {
    this.smokesensors_to_edit = one_smokesensors
  }
  on_close_modal_edit() {
    this.smokesensors_to_edit = undefined
  }
  delete_smokesensors(smokesensors: any) {
    this.loading_delete_smokesensors = true;
    this.api.taf_post("smokesensors/delete", smokesensors, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table smokesensors . Réponse = ", reponse)
        this.get_smokesensors()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table smokesensors  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_smokesensors = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_smokesensors = false;
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

  filteredData = this.les_smokesensorss;
  DT = ""

  filterCriteria = {
    states: '',
    dateFrom: '',
    dateTo: '',
  }

  filterData() {
    this.filteredData = this.les_smokesensorss.filter(smokesensors => {
      const matchesState = this.filterCriteria.states ? smokesensors.state === this.filterCriteria.states : true;
      const matchesDate = this.filterCriteria.dateFrom && this.filterCriteria.dateTo ?
        this.isWithinDateRange(smokesensors.updated_at, this.filterCriteria.dateFrom, this.filterCriteria.dateTo) : true;
      return matchesState && matchesDate;
    })
  }

  isWithinDateRange(DT: string, dateFrom: string, dateTo: string): boolean {
    const date = new Date(DT);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    return date >= fromDate && date <= toDate;
  }

  //download historique in pdf
  downloadPDF() {
    if (this.les_smokesensorss.length === 0) {
      alert('No data available to download.');
      return;
    }

    const doc = new jsPDF();
    const col = Object.keys(this.les_smokesensorss[0]);
    const rows = this.les_smokesensorss.map(item => col.map(key => item[key]));

    doc.text('Historique des Données des Detecteurs de Fumée', 14, 16);
    autoTable(doc, {
      head: [col],
      body: rows,
      startY: 20,
    });
    doc.save('historique_des_detecteurs_de_fumée.pdf');
  }
} 