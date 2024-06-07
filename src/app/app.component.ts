import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { ApiService } from './api.service';

import { SocketService } from './service/socket.service';
import { ApiService } from './service/api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private wsURL = 'ws://localhost:1880/ws/sensor';
  // sensorData: any[] = [];
  // latestSensorData: any = null; // Propriété pour stocker les dernières données reçues
  newData: any
  lastestSensorDataKey: any
  constructor(public api: ApiService, private wsService: SocketService) {

  }

  ngOnInit(): void {
    let wsSubject = this.wsService.connect(this.wsURL);
    wsSubject.subscribe(
      (msg: MessageEvent) => {
        let data = JSON.parse(msg.data);

        this.prepareData(data) //filter data so that we will always get all the elements
        console.log("data : ", this.newData);
        this.api.sensorData.push(this.newData);
        console.log("table length: ",this.api.sensorData.length)
        if(this.api.sensorData.length > 1){
          this.api.latestSensorData = this.newData; // Mettre à jour les dernières données reçues
          this.api.motionDetected = this.newData.motion === 'motion detected' || this.newData.motion === 'motion stoped';
          this.api.alertSmoke = this.newData.smoke === 'alert' || this.newData.smoke === 'stoped';
          this.api.alertWater = this.newData.water === 'alert' || this.newData.water === 'stoped';
        }else{
          this.api.latestSensorData = data; // Mettre à jour les dernières données reçues
          this.api.motionDetected = data.motion === 'motion detected' || data.motion === 'motion stoped';
          this.api.alertSmoke = data.smoke === 'alert' || data.smoke === 'stoped';
          this.api.alertWater = data.water === 'alert' || data.water === 'stoped';
        }

      },
      (err) => console.error(err),
      () => console.log('complete')
    );
  }
  title = 'angular-GreatWallAng';

  //creer une fonction pour les claculs sur le dernier element et le nouvel objet

  prepareData(data: any) {
    console.log("dernier element : ", this.api.sensorData[this.api.sensorData.length - 1])
    console.log("nouveau element : ", data)
    //afficher les cles du dernier du tableau
    if (this.api.sensorData.length) {

      let lastElement = this.api.sensorData[this.api.sensorData.length - 1];
      let newSensorDataKeyValue = Object.entries(data);
      let lastestSensorDataKeyValue = Object.entries(lastElement);
    
      console.log("les cles : ", newSensorDataKeyValue)
    
      let difference: any[] = [];
    
      // Compare les deux objets
      for (let [key, value] of lastestSensorDataKeyValue) {
        let found = false;
        for (let [lastKey, lastValue] of newSensorDataKeyValue) {
          console.log("Last key : ",lastKey)
          if (key === lastKey) {
            found = true;
            break;
          }
        }
        if (!found) {
          difference.push([key, value]);
        }
      }
    
      console.log("difference : ", difference);
      // Mettre à jour newSensorDataKeyValue avec les clés et valeurs de difference
      newSensorDataKeyValue = difference.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      this.newData = {
        ...newSensorDataKeyValue,
        ...data
      }
      console.log("newSensorDataKeyValue : ", this.newData);

    }
    // console.log("data : ", data);

  }


}
