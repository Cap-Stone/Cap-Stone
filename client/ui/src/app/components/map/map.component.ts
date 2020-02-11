import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';

// app.js
import { setDefaultOptions } from 'esri-loader';
 
// configure esri-loader to use version 3.31 from the ArcGIS CDN
// NOTE: make sure this is called once before any calls to loadModules()
setDefaultOptions({ version: '3.31' })

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    loadModules(['esri/map'])
    .then(([Map]) => {
      // create map with the given options at a DOM node w/ id 'mapNode'
      let map = new Map('mapNode', {
        center: [-118, 34.5],
        zoom: 8,
        basemap: 'hybrid'
      });
    })
    .catch(err => {
      // handle any script or module loading errors
      console.error(err);
    });
  }

}
