import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../service/socket.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-doorstatus',
  templateUrl: './list-doorstatus.component.html',
  styleUrls: ['./list-doorstatus.component.css']
})
export class ListDoorstatusComponent {
  authority_id: number = this.api.token.user_connected.authority_id
  loading_get_doorstatus = false
  loading_get_doorhistorique = false
  // les_doorstatuss: any[] = []
  les_doorhistoriques: any[] = []
  porte: any[] = []
  id_door: any
  selected_doorstatus: any = undefined
  doorstatus_to_edit: any = undefined
  loading_delete_doorstatus = false
  @ViewChild('closeDoorModal') closeDoorModal!: ElementRef;
  @ViewChild('closeEditDoorModal') closeEditDoorModal!: ElementRef;
  doorOpen1: boolean = false;
  doorOpen2: boolean = false;


  // closed = true
  private wsURL = 'ws://localhost:1880/ws/sensor';

  constructor(public api: ApiService, private wsService: SocketService) {

  }
  ngOnInit(): void {
    console.log("latesensordata : ", this.api.latestSensorData)

    this.get_doorstatus(),
      this.get_doorhistorique()
  }
  get_doorstatus() {
    this.loading_get_doorstatus = true;
    this.api.taf_post("doorstatus/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.api.les_doorstatuss = reponse.data
        // this.api.filterdbNr(this.api.les_doorstatuss)
        console.log("les_doorstatuss : ", this.api.les_doorstatuss)
      } else {
        console.log("L'opération sur la table doorstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_doorstatus = false;
    }, (error: any) => {
      this.loading_get_doorstatus = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.closeDoorModal.nativeElement.click();
      this.api.les_doorstatuss.unshift(event.doorstatus)
      this.get_doorstatus()
    } else {

    }
  }
  after_edit(params: any) {
    this.get_doorstatus();
    this.closeEditDoorModal.nativeElement.click();
  }
  voir_plus(one_doorstatus: any) {
    this.selected_doorstatus = one_doorstatus
  }
  on_click_edit(one_doorstatus: any) {
    let status: string = "";
      if (one_doorstatus.state == "opened" || one_doorstatus.stateDoor == "opened") {
        status = "closed"
      } else {
        status = "opened"
      }
      let doorState: any 
    if (one_doorstatus.id) {
      doorState = {
        idUser: this.api.token.user_connected.id,
        idDoor: one_doorstatus.id,
        nameDoor: one_doorstatus.name,
        stateDoor: status
      }
    }else if(one_doorstatus.idDoor){
      doorState = {
        idUser: this.api.token.user_connected.id,
        idDoor: one_doorstatus.idDoor,
        nameDoor: one_doorstatus.nameDoor,
        stateDoor: status
      }
    }
    this.sendMessage(doorState);
    // this.doorstatus_to_edit = one_doorstatus
  }
  on_close_modal_edit() {
    this.doorstatus_to_edit = undefined
  }
  after_open(params: any) {

  }
  delete_doorstatus(doorstatus: any) {
    this.loading_delete_doorstatus = true;
    this.api.taf_post("doorstatus/delete", doorstatus, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table doorstatus . Réponse = ", reponse)
        this.get_doorstatus()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table doorstatus  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_doorstatus = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_doorstatus = false;
      })
  }

  //track
  trackById(index: number, item: any): number {
    return item.id;
  }

  //get data from doorhistorique

  get_doorhistorique() {
    this.loading_get_doorhistorique = true;
    this.api.taf_post("doorhistorique/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_doorhistoriques = reponse.data
      } else {
        console.log("L'opération sur la table doorhistorique a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_doorhistorique = false;
    }, (error: any) => {
      this.loading_get_doorhistorique = false;
    })
  }


  //download historique in pdf
  downloadPDF() {
    if (this.les_doorhistoriques.length === 0) {
      alert('No data available to download.');
      return;
    }

    const doc = new jsPDF();
    const col = Object.keys(this.les_doorhistoriques[0]);
    const rows = this.les_doorhistoriques.map(item => col.map(key => item[key]));

    doc.text('Door Historique Data', 14, 16);
    autoTable(doc, {
      head: [col],
      body: rows,
      startY: 20,
    });
    doc.save('doorhistorique.pdf');
  }

  // filter
  filteredData = this.les_doorhistoriques;
  dateTime = ""

  filterCriteria = {
    idDoor: '',
    state: '',
    dateFrom: '',
    dateTo: '',
  };

  filterData() {
    this.filteredData = this.les_doorhistoriques.filter(doorhistorique => {
      const matchesIdDoor = this.filterCriteria.idDoor ? doorhistorique.idDoor == this.filterCriteria.idDoor : true;
      const matchesState = this.filterCriteria.state ? doorhistorique.state === this.filterCriteria.state : true;
      const matchesDate = this.filterCriteria.dateFrom && this.filterCriteria.dateTo ?
        this.isWithinDateRange(doorhistorique.updated_at, this.filterCriteria.dateFrom, this.filterCriteria.dateTo) : true;
      return matchesIdDoor && matchesState && matchesDate;
    });
  }

  isWithinDateRange(dateTime: string, dateFrom: string, dateTo: string): boolean {
    const date = new Date(dateTime);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    return date >= fromDate && date <= toDate;
  }

  sendMessage(doorState: { idUser: number, idDoor: number, nameDoor: string, stateDoor: string }): void {
    this.wsService.sendMessage(doorState);
    console.log("doorstate: ", doorState)
  }


}