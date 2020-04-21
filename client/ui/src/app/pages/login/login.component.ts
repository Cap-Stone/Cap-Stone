import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData ={}
  invalid = false;

  constructor(
    private dataservice: DataServiceService, 
    private router: Router,
  ) { }

  ngOnInit() {
    let currentUrl = this.router.url;
    console.log('ROUTE: ', currentUrl);
  }

  navigate() {
    window.open("https://benchmarkfamilyservices.org/");
  }

  loginUser() {
    this.dataservice.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/home'])
      },
      err => {
        this.invalid = true;
        console.log(err)
      }
    ) 

  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

}
