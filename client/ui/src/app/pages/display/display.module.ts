import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display.component';
import { MapModule } from 'src/app/components/map/map.module';

// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

@NgModule({
  declarations: [DisplayComponent],
  imports: [
    CommonModule,
    MapModule,
    AngularMaterialModule
  ]
})
export class DisplayModule { }
