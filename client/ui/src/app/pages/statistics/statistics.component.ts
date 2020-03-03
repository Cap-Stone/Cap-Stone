import { Component, OnInit } from '@angular/core';
 
// Importing CanvasJS 
import * as CanvasJS from './canvasjs.min';

// More information and documentation can be found at 
// https://canvasjs.com/angular-charts/

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('CanvasJS: ', CanvasJS);
  }
}
