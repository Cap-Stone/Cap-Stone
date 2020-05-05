import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { Router } from '@angular/router'
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material';

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
    private _location: Location,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  registerUser() {
    this.dataService.registerUser(this.registerUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)

        this.snackBar.open('SUCCESS: New user added!', 'OK', {
          duration: 5000,
        })
      },
      err => console.log(err)
    )      
  }

  goBack() {
    this._location.back();
  }

}
