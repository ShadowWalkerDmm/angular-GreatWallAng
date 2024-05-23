import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { HomeRoutingModule } from './home-routing.module';
  import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddDoorstatusComponent } from './doorstatus/add-doorstatus/add-doorstatus.component';
import { EditDoorstatusComponent } from './doorstatus/edit-doorstatus/edit-doorstatus.component';
import { ListDoorstatusComponent } from './doorstatus/list-doorstatus/list-doorstatus.component';
import { AddMotionsensorsComponent } from './motionsensors/add-motionsensors/add-motionsensors.component';
import { EditMotionsensorsComponent } from './motionsensors/edit-motionsensors/edit-motionsensors.component';
import { ListMotionsensorsComponent } from './motionsensors/list-motionsensors/list-motionsensors.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddWaterlevelsensorsComponent } from './waterlevelsensors/add-waterlevelsensors/add-waterlevelsensors.component';
import { EditWaterlevelsensorsComponent } from './waterlevelsensors/edit-waterlevelsensors/edit-waterlevelsensors.component';
import { ListWaterlevelsensorsComponent } from './waterlevelsensors/list-waterlevelsensors/list-waterlevelsensors.component';
import { AddWindowstatusComponent } from './windowstatus/add-windowstatus/add-windowstatus.component';
import { EditWindowstatusComponent } from './windowstatus/edit-windowstatus/edit-windowstatus.component';
import { ListWindowstatusComponent } from './windowstatus/list-windowstatus/list-windowstatus.component';
import { AddDoorhistoriqueComponent } from './doorhistorique/add-doorhistorique/add-doorhistorique.component';
import { EditDoorhistoriqueComponent } from './doorhistorique/edit-doorhistorique/edit-doorhistorique.component';
import { ListDoorhistoriqueComponent } from './doorhistorique/list-doorhistorique/list-doorhistorique.component';
import { AddAuthorityComponent } from './authority/add-authority/add-authority.component';
import { EditAuthorityComponent } from './authority/edit-authority/edit-authority.component';
import { ListAuthorityComponent } from './authority/list-authority/list-authority.component';
import { AddSmokesensorsComponent } from './smokesensors/add-smokesensors/add-smokesensors.component';
import { EditSmokesensorsComponent } from './smokesensors/edit-smokesensors/edit-smokesensors.component';
import { ListSmokesensorsComponent } from './smokesensors/list-smokesensors/list-smokesensors.component';
import { ProfileComponent } from './user/profile/profile.component';
  
  
  @NgModule({
    declarations: [
    HomeComponent,
    AddDoorstatusComponent,
    EditDoorstatusComponent,
    ListDoorstatusComponent,
    AddMotionsensorsComponent,
    EditMotionsensorsComponent,
    ListMotionsensorsComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    AddWaterlevelsensorsComponent,
    EditWaterlevelsensorsComponent,
    ListWaterlevelsensorsComponent,
    AddWindowstatusComponent,
    EditWindowstatusComponent,
    ListWindowstatusComponent,
    AddDoorhistoriqueComponent,
    EditDoorhistoriqueComponent,
    ListDoorhistoriqueComponent,
    AddAuthorityComponent,
    EditAuthorityComponent,
    ListAuthorityComponent,
    AddSmokesensorsComponent,
    EditSmokesensorsComponent,
    ListSmokesensorsComponent,
    ProfileComponent
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class HomeModule { }
  