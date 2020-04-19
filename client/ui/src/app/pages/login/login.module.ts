import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

// Angular Material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class LoginModule { }
