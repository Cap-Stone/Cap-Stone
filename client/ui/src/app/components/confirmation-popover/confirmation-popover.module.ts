import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationPopoverComponent } from './confirmation-popover.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';



@NgModule({
  declarations: [ConfirmationPopoverComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class ConfirmationPopoverModule { }
