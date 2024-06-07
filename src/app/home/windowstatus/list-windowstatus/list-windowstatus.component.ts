import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { SocketService } from '../../../service/socket.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-list-windowstatus',
  templateUrl: './list-windowstatus.component.html',
  styleUrls: ['./list-windowstatus.component.css']
})
export class ListWindowstatusComponent {
  authority_id: number = this.api.token.user_connected.authority_id
  loading_get_windowhistorique = false
  loading_get_windowstatus = false
  les_windowstatuss: any[] = []
  les_windowhistoriques: any[] = []
  selected_windowstatus: any = undefined
  windowstatus_to_edit: any = undefined
  loading_delete_windowstatus = false
  @ViewChild('closeWindowsModal') closeWindowsModal!: ElementRef;
  @ViewChild('closeEditWindowsModal') closeEditWindowsModal!: ElementRef;

  // closed = true
  private wsURL = 'ws://localhost:1880/ws/sensor';
  sensorData: any[] = [];
  latestSensorData: any = null; // Propriété pour stocker les dernières données reçues

  constructor(public api: ApiService, private wsService: SocketService) {

  }
  ngOnInit(): void {

    // let wsSubject = this.wsService.connect(this.wsURL);
    // wsSubject.subscribe(
    //   (msg: MessageEvent) => {
    //     const data = JSON.parse(msg.data);
    //     this.sensorData.push(data);
    //     this.latestSensorData = data; // Mettre à jour les dernières données reçues
    //     // this.closed = data.window === 'closed' || data.window === 'opened';
    //   },
    //   (err) => console.error(err),
    //   () => console.log('complete')
    // );

    this.get_windowstatus()
    this.get_windowhistorique()
  }
  get_windowstatus() {
    this.loading_get_windowstatus = true;
    this.api.taf_post("windowstatus/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_windowstatuss = reponse.data
        console.log("Opération effectuée avec succés sur la table windowstatus. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table windowstatus a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_windowstatus = false;
    }, (error: any) => {
      this.loading_get_windowstatus = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.closeWindowsModal.nativeElement.click();
      this.les_windowstatuss.unshift(event.windowstatus)
      this.get_windowstatus()
    } else {

    }
  }
  after_edit(params: any) {
    this.closeEditWindowsModal.nativeElement.click();
    this.les_windowstatuss[this.les_windowstatuss.indexOf(this.windowstatus_to_edit)] = params.new_data
    this.get_windowstatus()
  }
  voir_plus(one_windowstatus: any) {
    this.selected_windowstatus = one_windowstatus
  }
  on_click_edit(one_windowstatus: any) {
    this.windowstatus_to_edit = one_windowstatus
  }
  on_close_modal_edit() {
    this.windowstatus_to_edit = undefined
  }
  delete_windowstatus(windowstatus: any) {
    this.loading_delete_windowstatus = true;
    this.api.taf_post("windowstatus/delete", windowstatus, (reponse: any) => {
      //when success
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table windowstatus . Réponse = ", reponse)
        this.get_windowstatus()
        alert("Opération effectuée avec succés")
      } else {
        console.log("L'opération sur la table windowstatus  a échoué. Réponse = ", reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_windowstatus = false;
    },
      (error: any) => {
        //when error
        console.log("Erreur inconnue! ", error)
        this.loading_delete_windowstatus = false;
      })
  }

  // windows historique get function
  get_windowhistorique() {
    this.loading_get_windowhistorique = true;
    this.api.taf_post("windowhistorique/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_windowhistoriques = reponse.data
        console.log("Opération effectuée avec succés sur la table windowhistorique. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table windowhistorique a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_windowhistorique = false;
    }, (error: any) => {
      this.loading_get_windowhistorique = false;
    })
  }

  //filter

  filteredData = this.les_windowhistoriques;
  dateTime = ""

  filterCriteria = {
    idWindow: '',
    state: '',
    dateFrom: '',
    dateTo: '',
  };

  filterData() {
    this.filteredData = this.les_windowhistoriques.filter(window => {
      const matchesIdDoor = this.filterCriteria.idWindow ? window.idWindow == this.filterCriteria.idWindow : true;
      const matchesState = this.filterCriteria.state ? window.state === this.filterCriteria.state : true;
      const matchesDate = this.filterCriteria.dateFrom && this.filterCriteria.dateTo ?
        this.isWithinDateRange(window.uploadDate, this.filterCriteria.dateFrom, this.filterCriteria.dateTo) : true;
      return matchesIdDoor && matchesState && matchesDate;
    });
  }

  isWithinDateRange(uploadDate: string, dateFrom: string, dateTo: string): boolean {
    const date = new Date(uploadDate);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    return date >= fromDate && date <= toDate;
  }

  //download historique in pdf
  downloadPDF() {
    if (this.les_windowhistoriques.length === 0) {
      alert('No data available to download.');
      return;
    }

    const doc = new jsPDF();
    const col = Object.keys(this.les_windowhistoriques[0]);
    const rows = this.les_windowhistoriques.map(item => col.map(key => item[key]));

    doc.text('Historique des Données des Fenêtres', 14, 16);
    autoTable(doc, {
      head: [col],
      body: rows,
      startY: 20,
    });
    doc.save('historiquefenetres.pdf');
  }
}