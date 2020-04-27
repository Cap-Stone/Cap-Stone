import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './pages/display/display.component';
import { HomeComponent } from './pages/home/home.component';
import { OnBoardingComponent } from './pages/on-boarding/on-boarding.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path: 'display', component: DisplayComponent},
  {path: 'home', component: HomeComponent},
  {path: 'on-boarding', component: OnBoardingComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
