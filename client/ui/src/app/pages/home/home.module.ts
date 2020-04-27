import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [HomeComponent], // delare HomeComponent
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class HomeModule { }
