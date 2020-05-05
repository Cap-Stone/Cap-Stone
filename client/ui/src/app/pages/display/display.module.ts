import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display.component';
import { MapModule } from 'src/app/components/map/map.module';
import {RouterModule} from '@angular/router'

// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [DisplayComponent],
  imports: [
    CommonModule,
    MapModule,
    AngularMaterialModule,
    RouterModule.forRoot([
      {
        path:'login',
        component: LoginComponent
      }

    ])
  ]
})
export class DisplayModule { }
