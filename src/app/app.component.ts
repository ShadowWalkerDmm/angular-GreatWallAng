import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
        // if (this.api.sensorData.length < 1) {
        //   this.api.sensorData.push(data);
        // }
        // this.prepareData(data) filter data so that we will always get all the elements
        // console.log("data : ", this.newData);
        this.api.sensorData.push(data);
        // if (this.api.sensorData.length > 1) {
        this.api.latestSensorData = data; 
        // if (this.api.les_doorstatuss) {
        //   this.api.filterdbNr(this.api.les_doorstatuss)
        // }
        this.api.motionDetected = data.motion === 'motion detected' || data.motion === 'motion stoped';
        this.api.alertSmoke = data.smoke === 'alert' || data.smoke === 'stoped';
        this.api.alertWater = data.water === 'alert' || data.water === 'stoped';
         console.log("from node-red: ", this.api.latestSensorData)
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
    if (this.api.sensorData.length >= 1) {

      let lastElement = this.api.sensorData[this.api.sensorData.length - 1];
      let newSensorDataKeyValue = Object.entries(data);
      let lastestSensorDataKeyValue = Object.entries(lastElement);

      let difference: any[] = [];

      // Compare les deux objets
      // for (let [key, value] of lastestSensorDataKeyValue) {
      //   let found = false;
      //   for (let [lastKey, lastValue] of newSensorDataKeyValue) {
      //     if (key === lastKey) {
      //       if (lastKey == "doors") {
      //         console.log("doors : ", value[value.length - 1]);
      //       }
      //       found = true;
      //       break;
      //     }
      //   }
      //   if (!found) {
      //     difference.push([key, value]);
      //   }
      // }
      for (let [key, value] of lastestSensorDataKeyValue) {
        let found = false;
        for (let [lastKey, lastValue] of newSensorDataKeyValue) {
          if (key === lastKey) {
            // if (lastKey === "doors") {
            //   if (Array.isArray(value) && Array.isArray(lastValue)) {
            //     // Compare the idDoor[] of value and lastValue[]
            //     for (let i = 0; i < value.length; i++) {
            //       let valueIdDoor = value[i];
            //       let lastValueIdDoor = lastValue[i];
            //       // If the idDoor elements don't match, insert the lastValue element into value
            //       console.log("received door: ", lastValueIdDoor)
            //       if (valueIdDoor !== lastValueIdDoor) {
            //         lastValueIdDoor[i] = valueIdDoor[i]
            //         console.log("lastValueIdDoor: ", lastValueIdDoor[i])
            //         console.log("valueIdDoor: ", valueIdDoor[i])
            //       }
            //     }
            //     // console.log("Updated doors: ", value);
            //   } else {
            //     console.log("Error: value is not an array for key 'doors'");
            //   }
            // }
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

      // this.api.sensorData.push(this.newData);
      console.log("api.sensorData : ", this.api.sensorData);

      console.log("newData : ", this.newData);
    }

  }

}
