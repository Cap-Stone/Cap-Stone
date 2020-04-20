import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnBoardingComponent } from './on-boarding.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';


@NgModule({
  declarations: [OnBoardingComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OnBoardingModule { }
