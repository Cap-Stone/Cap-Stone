import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import {DisplayComponent} from '../display/display.component';
import {RouterModule} from '@angular/router'
import { HomeComponent } from '../home/home.component';
// Angular Material 
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },

    ])
  ]
})
export class StatisticsModule { }
