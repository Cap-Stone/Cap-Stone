import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display.component';
import { MapModule } from 'src/app/components/map/map.module';

@NgModule({
  declarations: [DisplayComponent],
  imports: [
    CommonModule,
    MapModule,
  ]
})
export class DisplayModule { }
