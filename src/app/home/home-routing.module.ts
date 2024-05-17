import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDoorstatusComponent } from './doorstatus/list-doorstatus/list-doorstatus.component';
import { ListMotionsensorsComponent } from './motionsensors/list-motionsensors/list-motionsensors.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { ListWaterlevelsensorsComponent } from './waterlevelsensors/list-waterlevelsensors/list-waterlevelsensors.component';
import { ListWindowstatusComponent } from './windowstatus/list-windowstatus/list-windowstatus.component';
import { ListDoorhistoriqueComponent } from './doorhistorique/list-doorhistorique/list-doorhistorique.component';

const routes: Routes = [
  { path: "doorstatus", component: ListDoorstatusComponent },
  { path: "motionsensors", component: ListMotionsensorsComponent },
  { path: "user", component: ListUserComponent },
  { path: "waterlevelsensors", component: ListWaterlevelsensorsComponent },
  { path: "windowstatus", component: ListWindowstatusComponent },
  { path: "doorhistorique", component: ListDoorhistoriqueComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }