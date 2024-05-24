import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-doorstatus',
  templateUrl: './list-doorstatus.component.html',
  styleUrls: ['./list-doorstatus.component.css']
})
export class ListDoorstatusComponent {
  loading_get_doorstatus = false
  loading_get_doorhistorique = false
  les_doorstatuss: any[] = []
  les_doorhistoriques: any[] = []
  id_door: any
  selected_doorstatus: any = undefined
  doorstatus_to_edit: any = undefined
  loading_delete_doorstatus = false
  @ViewChild('closeDoorModal') closeDoorModal!: ElementRef;
  @ViewChild('closeEditDoorModal') closeEditDoorModal!: ElementRef;
  doorOpen1: boolean = false;
  doorOpen2: boolean = false;


  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_doorstatus(),
      this.get_doorhistorique()
  }
  get_doorstatus() {
    this.loading_get_doorstatus = true;
    this.api.taf_post("doorstatus/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_doorstatuss = reponse.data
        reponse.data.forEach((door: any) => {
        });
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
      this.les_doorstatuss.unshift(event.doorstatus)
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
    this.doorstatus_to_edit = one_doorstatus
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

  // filter
  filteredData = this.les_doorhistoriques;
  dateTime = ""

  filterCriteria = {
    idDoor: '',
    state: '',
    dateFrom: '',
    dateTo: '',
    // timeFrom: '',
    // timeTo: ''
  };

  filterData() {
    this.filteredData = this.les_doorhistoriques.filter(doorhistorique => {
      // const matchesIdDoor = this.filterCriteria.idDoor ? doorhistorique.idDoor.includes(this.filterCriteria.idDoor) : true;
      const matchesIdDoor = this.filterCriteria.idDoor ? doorhistorique.idDoor == this.filterCriteria.idDoor : true;
      const matchesState = this.filterCriteria.state ? doorhistorique.state === this.filterCriteria.state : true;
      const matchesDate = this.filterCriteria.dateFrom && this.filterCriteria.dateTo ?
        this.isWithinDateRange(doorhistorique.updated_at, this.filterCriteria.dateFrom, this.filterCriteria.dateTo) : true;
      // const matchesTime = this.filterCriteria.timeFrom && this.filterCriteria.timeTo ?
      // this.isWithinTimeRange(doorhistorique.updated_at, this.filterCriteria.timeFrom, this.filterCriteria.timeTo) : true;
      return matchesIdDoor && matchesState && matchesDate ;/*&& matchesTime;*/
    });
  }

  isWithinDateRange(dateTime: string, dateFrom: string, dateTo: string): boolean {
    const date = new Date(dateTime);
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    console.log("date time",date)
    console.log("date from",fromDate)
    console.log("date to",toDate)
    return date >= fromDate && date <= toDate;
  }

  // isWithinTimeRange(dateTime: string, timeFrom: string, timeTo: string): boolean {
  //   const time = this.parseTime(dateTime);
  //   const fromTime = this.parseTime(timeFrom);
  //   const toTime = this.parseTime(timeTo);
  //   return time >= fromTime && time <= toTime;
  // }

  // parseDateTime(dateTime: string): Date {
  //   const [datePart, timePart] = dateTime.split(' ');
  //   const [year, month, day] = datePart.split('-').map(part => parseInt(part, 10));
  //   const [hours, minutes, seconds] = timePart.split(':').map(part => parseInt(part, 10));
  //   return new Date(year, month - 1, day, hours, minutes, seconds);
  // }

  // parseTime(time: string): number {
  //   const [hours, minutes, seconds] = time.split(':').map(part => parseInt(part, 10));
  //   return hours * 3600 + minutes * 60 + seconds;
  // }
}