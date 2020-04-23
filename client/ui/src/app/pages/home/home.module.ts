import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {StatisticsComponent} from '../statistics/statistics.component';
import {DisplayComponent} from '../display/display.component';
import {RouterModule} from '@angular/router'
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { OnBoardingComponent } from '../on-boarding/on-boarding.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
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
  ]
})
export class HomeModule { }
