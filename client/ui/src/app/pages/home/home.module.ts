import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {StatisticsComponent} from '../statistics/statistics.component';
import {DisplayComponent} from '../display/display.component';
import {RouterModule} from '@angular/router'
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { OnBoardingComponent } from '../on-boarding/on-boarding.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuardGuard } from 'src/app/auth-guard.guard';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'display',
        component: DisplayComponent,
        canActivate: [AuthGuardGuard],
      },
      {
        path:'stat',
        component: StatisticsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path:'on-boarding',
        component: OnBoardingComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path:'login',
        component: LoginComponent
      }

    ])
  ]
})
export class HomeModule { }
