import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLoginComponent } from './login/list-login/list-login.component';
import { RegistationComponent } from './registation/registation.component';

const routes: Routes = [
  { path: "", component: ListLoginComponent },
  { path: "login", component: ListLoginComponent },
  { path: "registration", component: RegistationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }