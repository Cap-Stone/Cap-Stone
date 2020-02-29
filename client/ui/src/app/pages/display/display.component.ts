import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor() { }
  
  // Corpus Christi Coordinates and map type/zoom
  mapCenter = [-97.396378, 27.800583];
  basemapType = 'streets';
  mapZoomLevel = 10;

  // Checks the status of the map
  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

  ngOnInit() {
  }

}