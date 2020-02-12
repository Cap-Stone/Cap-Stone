import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  constructor() { }

  mapCenter = [-97.396378, 27.800583];
  basemapType = 'hybrid';
  mapZoomLevel = 12;

  // See map.component.ts
  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

  ngOnInit() {
  }

}
