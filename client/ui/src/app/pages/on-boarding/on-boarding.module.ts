import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnBoardingComponent } from './on-boarding.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router'
// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
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
        path:'login',
        component: LoginComponent
      }

    ])
  ]
})
export class OnBoardingModule { }
