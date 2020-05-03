import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnBoardingComponent } from './on-boarding.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

import {StatisticsComponent} from '../statistics/statistics.component';
import {DisplayComponent} from '../display/display.component';
import {RouterModule} from '@angular/router'

import { LoginComponent } from '../login/login.component';


@NgModule({
  declarations: [OnBoardingComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
    
      {
        path: 'display',
        component: DisplayComponent
      },
      {
        path:'stat',
        component: StatisticsComponent
      },
      {
        path:'on-boarding',
        component: OnBoardingComponent
      },
      {
        path:'login',
        component: LoginComponent
      }

    ])
  ]
})
export class OnBoardingModule { }
