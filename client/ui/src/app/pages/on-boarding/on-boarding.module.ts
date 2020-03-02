import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnBoardingComponent } from './on-boarding.component';

// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';


@NgModule({
  declarations: [OnBoardingComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class OnBoardingModule { }
