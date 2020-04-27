import { Component, OnInit, Inject, OnDestroy, ViewChild, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { loadModules } from 'esri-loader';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationPopoverComponent } from '../confirmation-popover/confirmation-popover.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataServiceService } from '../../services/data-service.service';
import { formatDate } from '@angular/common';

export interface DialogData {
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom: any;
  private _center: any;
  private _basemap: any;
  private _loaded = false;
  private _view: any = null;

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
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dataService: DataServiceService,
  ) {}

  _Graphic: any;
  dialogRef: any;
  snackBarRef: any;
  getPoints: any;
  pointGraphic = [];
  pointsData = {}
  x: any;
  y: any;
  today: Date = new Date();
  getPointsData = {}

  readonly ESRI_PRINT_URL: string =
    'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';

  //////////////////////////////////////// INITIALIZE MAP ////////////////////////////////////////
  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView, EsriExpand, EsriPrint, Graphic] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        'esri/widgets/Expand',
        'esri/widgets/Print',
        'esri/Graphic'
      ]);

      this._Graphic = Graphic;

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

      this._view = new EsriMapView(mapViewProperties);

      this._view.on("click", (event) => {
        this.getCoord(event);
      }); 

      // Add the graphics to the view's graphics layer
      this._view.ui.add(new EsriExpand({
        view: this._view,
        content: new EsriPrint({
          view: this._view,
          // specify your own print service
          printServiceUrl:
            this.ESRI_PRINT_URL,
          expandIcon: 'esri-icon-print',
          expanded: false
        }),
      }), 'top-left');

      await this._view.when();
      return this._view; 
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  //////////////////////////////////////// GET COORDINATES ////////////////////////////////////////
  getCoord(ev: any) {
    console.log('Clicked', ev);
    console.log('DATE: ', this.today);

    this.dialogRef = this.dialog.open(ConfirmationPopoverComponent, {
      width: '250px',
    });

    this.dialogRef.afterClosed().subscribe((event) => {
      console.log('DISMISSED: ', event);

      this.pointsData = {
        x: ev.mapPoint.latitude,
        y: ev.mapPoint.longitude,
        effective: false,
        date: this.today,
      }

      if (event === "confirm") {
        //Creating and Saving points graphic 
        this.dataService.savePoint(this.pointsData).subscribe(
          res => {
            localStorage.setItem('token', res.token)

            // First create a point geometry
            var point = {
              type: "point", // autocasts as new Point()
              longitude: ev.mapPoint.longitude,
              latitude: ev.mapPoint.latitude
            };

            // Create a symbol for drawing the point
            var markerSymbol = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [226, 119, 40],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            };

            // Create a graphic and add the geometry and symbol to it
            var pointGraphic = new this._Graphic({
              geometry: point,
              symbol: markerSymbol
            });

            // Add the graphics to the view's graphics layer
            this._view.graphics.addMany([pointGraphic]);
            
            this.snackBarRef = this.snackBar.open('Point successfully saved!', 'OK', {
              duration: 5000,
            })
          },
          err => {
            console.log('ERROR: ', err);
            this.snackBarRef = this.snackBar.open('ERROR: POINT NOT SAVED!', 'OK', {
              duration: 5000,
            })
          }
        )      

      } else {
        console.log('Point cancelled');

        this.snackBarRef = this.snackBar.open('Point not saved', 'OK', {
          duration: 5000,
        })
      }
    });
  }

  getSavedPoints() {
    this.dataService.getPoints().subscribe(
      (response) => {
        const arrayLength = response.length;

        // Make all saved points on map
        for(var count = 0; count < arrayLength; count++) {

          // First create a point geometry
          var point = {
            type: "point", // autocasts as new Point()
            latitude: response[count].x,
            longitude: response[count].y,
          };

          if (response[count].effective === false) {
            // Create a symbol for drawing the point
            var markerSymbol = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [226, 119, 40],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            };
          } else {
            // Create a symbol for drawing the point
            var markerSymbol = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [0, 153, 255],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            };
          }

          // Create a graphic and add the geometry and symbol to it
          this.pointGraphic[count] = new this._Graphic({
            geometry: point,
            symbol: markerSymbol
          });

          this._view.graphics.add(this.pointGraphic[count]);
        }
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    )
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);

      // this.getSavedPoints();
    });
  }

  // Recalls the initialeMap function to display new basemap
  ngOnChanges() {
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);

      this.getSavedPoints();
    });
  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }

}