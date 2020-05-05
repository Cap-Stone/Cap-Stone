import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from './services/data-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    public dataService: DataServiceService,
    public router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CAN ACTIVATE CALLED');
    return this.checkLogIn();
  }

  checkLogIn() {
    console.log('LOGGED IN: ', this.dataService.isLoggedIn);
    if (this.dataService.isLoggedIn) {
      return true;
    } 

    this.router.navigate(['/login'])
  }
  
}
