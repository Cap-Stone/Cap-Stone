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
  constructor(private dataservice: DataServiceService, private _router: Router ) {

   }

  ngOnInit() {
   
  }
  loginUser()
  {
    this.dataservice.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
      },
      err => console.log(err)
    ) 

  }


}
