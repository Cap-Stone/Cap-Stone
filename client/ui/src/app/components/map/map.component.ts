import { Component, OnInit, Inject, OnDestroy, ViewChild, Input, Output, EventEmitter, ElementRef, SimpleChange } from "@angular/core";
import { loadModules } from 'esri-loader';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmationPopoverComponent } from '../confirmation-popover/confirmation-popover.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataServiceService } from '../../services/data-service.service';
import { formatDate } from '@angular/common';
import { PointPopoverComponent } from '../point-popover/point-popover.component';
import * as _ from 'underscore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  @Input() _basemap: any;
  private _loaded = false;
  private _view: any = null;
  map: any;
  hybridMapMessage = 0;

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
      const [EsriMap, EsriMapView, EsriExpand, EsriPrint, Graphic, BasemapToggle] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        'esri/widgets/Expand',
        'esri/widgets/Print',
        'esri/Graphic',
        "esri/widgets/BasemapToggle",
      ]);

      this._Graphic = Graphic;

      // console.log('LOOK: ', this._basemap);
      // Configure the Map
      const mapProperties: any = {
        basemap: this._basemap
      };

       this.map = new EsriMap(mapProperties);

      // Initialize the MapView
      const mapViewProperties: any = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: this.map
      };

      this._view = new EsriMapView(mapViewProperties);

      // allows for toggling to the 'hybrid' basemap
      var toggle = new BasemapToggle({
        view: this._view,
        nextBasemap: "hybrid"
      });

      // Adding basemap toggle to map
      this._view.ui.add(toggle, "top-right");

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

      // Event for point click
      this._view.on('pointer-down', (event) => {
        console.log(event);

        if (this._view.map.basemap.id === "hybrid" && this.hybridMapMessage  === 0 ) {
          this.hybridMapMessage++;
          this.snackBarRef = this.snackBar.open('Unfortunately, points CANNOT be added when on the hybrid map but you can still EDIT points.', 'OK', {
            duration: 10000,
          })
        }

        this._view.hitTest(event).then((response) => {
          const graphic = response.results[0].graphic;
          console.log('RESPONSE: ', response);
          // Has to have at least one graphic and has to exist in the graphics list
          if (response.results.length > 0 && _.find(this._view.graphics.items, (item) => item.uid === graphic.uid)) {
            this.snackBarRef.dismiss();
            this.showPointPopover(graphic);
          } else {
            this.getCoord(response.results[0]);
          }
        });
      });

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
      async (response) => {
        console.log(response);
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
            symbol: markerSymbol,
            attributes: response[count]
          });

          this._view.graphics.add(this.pointGraphic[count]);
        }
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  /**
   * (Shows the popover for the map)
   *
   * @memberof MapComponent
   */
  showPointPopover(graphic: any): void {
    this.dialogRef = this.dialog.open(PointPopoverComponent, {
      width: '350px',
      data: graphic
    });

    this.dialogRef.afterClosed().subscribe((event) => {
      console.log('DISMISSED: ', event);
      console.log(graphic);

      if (event !== '') {
        this.ngOnChanges(graphic);
      }
    });
  }

  ngOnInit() {
    // console.log('LOOK: ', this._basemap);

    // Initialize MapView and return an instance of MapView
    // this.initializeMap().then(mapView => {
    //   // The map has been initialized
    //   console.log("mapView ready: ", this._view.ready);
    //   this._loaded = this._view.ready;
    //   this.mapLoadedEvent.emit(true);

    //   // this.getSavedPoints();
    // });
  }

  // Recalls the initialeMap function to display new basemap
  ngOnChanges(changes: SimpleChange) {
    // console.log('CHANGES: ', changes);
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
