import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './pages/display/display.component';
import { HomeComponent } from './pages/home/home.component';
import { OnBoardingComponent } from './pages/on-boarding/on-boarding.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardGuard } from './auth-guard.guard';


const routes: Routes = [
  {path: 'display', component: DisplayComponent, canActivate: [AuthGuardGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard]},
  {path: 'on-boarding', component: OnBoardingComponent, canActivate: [AuthGuardGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
