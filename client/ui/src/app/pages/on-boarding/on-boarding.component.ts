
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.scss']
})
export class OnBoardingComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  opened: boolean;

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }
  
}
