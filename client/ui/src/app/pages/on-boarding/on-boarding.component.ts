
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss']
})
export class OnBoardingComponent implements OnInit {

  constructor(
    private _location: Location,
    public dataService: DataServiceService,
    public router: Router
  ) { }

  opened: boolean;

  ngOnInit() {
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this._location.back();
  }
  
}
