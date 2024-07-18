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

  loading_get_node_red = false
  // private wsURL = 'ws://192.168.1.8:1880/ws/sensor';
  // private wsURL = 'ws://' + this.api.node_red_base_url + ':1880/ws/sensor';
  newData: any
  lastestSensorDataKey: any
  constructor(public api: ApiService, private wsService: SocketService) {

  }
  title = 'GreatWallAng';

  ngOnInit(): void {
    this.get_node_red();
  }

  wsocket(wsURL: string){
    // console.log("wsUrl:", wsURL)
    let wsSubject = this.wsService.connect(wsURL);
    wsSubject.subscribe(
      (msg: MessageEvent) => {
        let data = JSON.parse(msg.data);
        this.api.sensorData.push(data);
        this.api.latestSensorData = data;
        this.api.motionDetected = data.motion === 'motion detected' || data.motion === 'motion stoped';
        this.api.alertSmoke = data.smoke === 'alert' || data.smoke === 'stoped';
        this.api.alertWater = data.water === 'alert' || data.water === 'stoped';
        console.log("from node-red: ", this.api.latestSensorData)
      },
      (err) => console.error(err),
      () => console.log('complete')
    );
  }

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

      for (let [key, value] of lastestSensorDataKeyValue) {
        let found = false;
        for (let [lastKey, lastValue] of newSensorDataKeyValue) {
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

      // this.api.sensorData.push(this.newData);
      console.log("api.sensorData : ", this.api.sensorData);

      console.log("newData : ", this.newData);
    }

  }

  get_node_red() {
    this.loading_get_node_red = true;
    this.api.taf_post("node_red/get", {}, (reponse: any) => {
      if (reponse.status) {
        // this.les_node_reds = reponse.data
        this.api.node_red_base_url = reponse.data[0]
        console.log("node_base_url : ", this.api.node_red_base_url)
        const wsURL = 'ws://' + this.api.node_red_base_url.link + ':1880/ws/sensor'
        console.log("wsUrl:", wsURL)
        this.wsocket(wsURL)
        console.log("Opération effectuée avec succés sur la table node_red. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table node_red a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_node_red = false;
    }, (error: any) => {
      this.loading_get_node_red = false;
    })
  }

}
