import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import {
  loadModules
} from 'esri-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() mapLoadedEvent = new EventEmitter < boolean > ();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", {
    static: true
  }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  _zoom: any;
  _center: any;
  _basemap: any;
  _loaded = false;
  _view: any = null;
  locatorTask: any;

  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array < number > ) {
    this._center = center;
  }

  get center(): Array < number > {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView, View, BasemapToggle, Locator, Editor] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/View",
        "esri/widgets/BasemapToggle",
        "esri/tasks/Locator",
        "esri/widgets/Editor",
      ]);

      // Create a locator task using the world geocoding service
      this.locatorTask = new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
      });

      console.log('LOCATOR: ', this.locatorTask);

      // Configure the Map
      const mapProperties: any = {
        basemap: this._basemap
      };

      const map: any = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: any = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      // View being Initialized
      this._view = new EsriMapView(mapViewProperties);

      // const toggle = new BasemapToggle({
      //   view: this._view
      // });

      // this._view.ui.add(toggle, "top-right");

      var editor = new Editor({
        view: this._view
      });

      console.log('EDITOR: ', editor);
      
      this._view.ui.add(editor, "top-right");

      await this._view.when(); // View is being 
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  getCoord(ev: any) {
    // console.log('X: ', ev.layerX);
    // console.log('Y: ', ev.layerY);
    console.log('Clicked: ', ev);
    // Get the coordinates of the click on the view
    // around the decimals to 3 decimals
    var lat = ev.x;
    var lon = ev.y;

    console.log('LAT: ', lat);
    console.log('LON: ', lon);

    this._view.popup.open({
      // Set the popup's title to the coordinates of the clicked location
      title: "Reverse geocode: [" + lon + ", " + lat + "]",
      location: ev // Set the location of the popup to the clicked location
    });

    var params = {
      location: ev
    };

    console.log('PARAMS: ', params);
    
    // Execute a reverse geocode using the clicked location
    this.locatorTask.locationToAddress(params).then(function(response) {
        // If an address is successfully found, show it in the popup's content
        this._view.popup.content = response.address;
      }).catch(function(error) {
        // If the promise fails and no result is found, show a generic message
        this._view.popup.content = "No address was found for this location";
      });
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  // Recalls the initialeMap function to display new basemap
  ngOnChanges() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }

}
