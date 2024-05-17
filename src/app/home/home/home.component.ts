import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
      // {libelle:"Admin",path:"/home/admin"},
{libelle:"Doorstatus",path:"/home/doorstatus"},
{libelle:"Motionsensors",path:"/home/motionsensors"},
{libelle:"User",path:"/home/user"},
{libelle:"Waterlevelsensors",path:"/home/waterlevelsensors"},
{libelle:"Windowstatus",path:"/home/windowstatus"}
    ]
  }
}
