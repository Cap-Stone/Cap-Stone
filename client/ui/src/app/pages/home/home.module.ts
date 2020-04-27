import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
<<<<<<< HEAD
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from "@angular/material/button";


=======
import {StatisticsComponent} from '../statistics/statistics.component';
import {DisplayComponent} from '../display/display.component';
import {RouterModule} from '@angular/router'
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { OnBoardingComponent } from '../on-boarding/on-boarding.component';
>>>>>>> 5c5e0d473447d80516844b8f0709ea212af92955

@NgModule({
  declarations: [HomeComponent], // delare HomeComponent
  imports: [
    CommonModule,
<<<<<<< HEAD
    MatButtonModule,
    MatCardModule
=======
    AngularMaterialModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
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
      }

    ])
>>>>>>> 5c5e0d473447d80516844b8f0709ea212af92955
  ]
})
export class HomeModule { }
