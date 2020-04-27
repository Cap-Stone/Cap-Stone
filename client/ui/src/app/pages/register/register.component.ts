import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router'
import {Location} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(
    private dataService: DataServiceService,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this.dataService.registerUser(this.registerUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/login'])
      },
      err => console.log(err)
    )      
  }

  goBack() {
    this._location.back();
  }

}
