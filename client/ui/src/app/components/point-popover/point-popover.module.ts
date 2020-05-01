import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointPopoverComponent } from './point-popover.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PointPopoverComponent],
  entryComponents: [PointPopoverComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class PointPopoverModule { }
