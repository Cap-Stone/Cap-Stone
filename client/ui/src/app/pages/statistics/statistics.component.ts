import { Component, OnInit } from '@angular/core';

// Importing CanvasJS 
import * as CanvasJS from './canvasjs.min';
import {Location} from '@angular/common';

// More information and documentation can be found at 
// https://canvasjs.com/angular-charts/

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})


export class StatisticsComponent implements OnInit {

  constructor(
    private _location: Location
  ) {}

  signData = []

  onChange(deviceValue) {
    this.signData = []
    console.log(deviceValue);
    if (deviceValue == 1) {
      this.signData = [{
          y: 1,
          label: "Corpus"
        },
        {
          y: 5,
          label: "Portland"
        },
        {
          y: 3,
          label: "Mathis"
        },
        {
          y: 0,
          label: "Beeville"
        },
        {
          y: 2,
          label: "Rockport"
        }
      ]
    } else if (deviceValue == 2) {
      this.signData = [{
          y: 0,
          label: "Corpus"
        },
        {
          y: 3,
          label: "Portland"
        },
        {
          y: 2,
          label: "Mathis"
        },
        {
          y: 0,
          label: "Beeville"
        },
        {
          y: 1,
          label: "Rockport"
        }
      ]
    }
    new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Potential Clients"
      },
      data: [{
        type: "column",
        dataPoints: this.signData
      }]
    }).render();
  }

  ngOnInit() {}

  goBack() {
    this._location.back();
  }

}
