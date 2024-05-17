import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { HomeRoutingModule } from './public-routing.module';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from './public/public.component';
import { ListLoginComponent } from './login/list-login/list-login.component';
import { RegistationComponent } from './registation/registation.component';
import { HttpClientModule } from '@angular/common/http';
  
  
  @NgModule({
    declarations: [
    PublicComponent,
    ListLoginComponent,
    RegistationComponent,
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule
    ]
  })
  export class PublicModule { }
  