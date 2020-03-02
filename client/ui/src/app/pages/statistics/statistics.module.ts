import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';

// Angular Material 
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class StatisticsModule { }
