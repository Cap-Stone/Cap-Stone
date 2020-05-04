import { Component, OnInit, Pipe } from '@angular/core';

// Importing CanvasJS 
import * as CanvasJS from './canvasjs.min';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataServiceService } from 'src/app/services/data-service.service';

// More information and documentation can be found at 
// https://canvasjs.com/angular-charts/

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})


export class StatisticsComponent implements OnInit {

  constructor(
    private _location: Location,
    public snackBar: MatSnackBar,
    public dataService: DataServiceService,
  ) {}

  opened: boolean;
  signData = []
  init = "0";
  snackBarRef: any;
  jan_Calls = 0;
  jan = 0;
  feb_Calls = 0;
  feb = 0;
  march_Calls = 0;
  march = 0;
  april_Calls = 0;
  april = 0;
  may_Calls = 0;
  may = 0;
  june_Calls = 0;
  june = 0;
  july_Calls = 0;
  july = 0;
  aug_Calls = 0;
  aug = 0;
  sep_Calls = 0;
  sep = 0;
  oct_Calls = 0;
  oct = 0;
  nov_Calls = 0;
  nov = 0;
  dec_Calls = 0;
  dec = 0;

  ngOnInit() {
    this.onChange(this.init);

    this.snackBarRef = this.snackBar.open('Please select a month to analyze!', 'OK', {
      duration: 5000,
    })

    // Getting points data to fill statistics
    this.dataService.getPoints().subscribe(
      (response) => {
        console.log(response);
        const arrayLength = response.length;

        // getting the dates from the saved points 
        for(var count = 0; count < arrayLength; count++) {

          // getting the month that each point was saved
          let month = response[count].date.substring(5,7); 

          switch (month) {
            case "01": {
              this.jan++;

              if (response[count].effective === true) {
                this.jan_Calls++;
              }
              break;
            }
            case "02": {
              this.feb++;

              if (response[count].effective === true) {
                this.feb_Calls++;
              }
              break;
            }
            case "03": {
              this.march++;

              if (response[count].effective === true) {
                this.march_Calls++;
              }
              break;
            }
            case "04": {
              this.april++;

              if (response[count].effective === true) {
                this.april_Calls++;
              }
              break;
            }
            case "05": {
              this.may++;

              if (response[count].effective === true) {
                this.may_Calls++;
              }
              break;
            }
            case "06": {
              this.june++;

              if (response[count].effective === true) {
                this.june_Calls++;
              }
              break;
            }
            case "07": {
              this.july++;

              if (response[count].effective === true) {
                this.july_Calls++;
              }
              break;
            }
            case "08": {
              this.aug++;

              if (response[count].effective === true) {
                this.aug_Calls++;
              }
              break;
            }
            case "09": {
              this.sep++; 

              if (response[count].effective === true) {
                this.sep_Calls++;
              }
              break;
            }
            case "10": {
              this.oct++;

              if (response[count].effective === true) {
                this.oct_Calls++;
              }
              break;
            }
            case "11": {
              this.nov++;

              if (response[count].effective === true) {
                this.nov_Calls++;
              }
              break;
            }
            case "12": {
              this.dec++;

              if (response[count].effective === true) {
                this.dec_Calls++;
              }
              break;
            }
            default: {
              console.log('ERROR: There was trouble getting your data');
            }
          }
        }

      },
      (error) => {
        console.log('ERROR: ', error);
      }
    );
  }

  onChange(deviceValue: any) {
    this.signData = []
    console.log("DEVICE VALUE", deviceValue);

    switch (deviceValue) {
      case "0": {
        this.signData = [{
            y: 0,
            label: "Produced Calls"
          },
          {
            y: 0,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "1": {
        this.signData = [{
            y: this.jan_Calls,
            label: "Produced Calls"
          },
          {
            y: this.jan,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "2": {
        this.signData = [{
            y: this.feb_Calls,
            label: "Produced Calls"
          },
          {
            y: this.feb,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "3": {
        this.signData = [{
            y: this.march_Calls,
            label: "Produced Calls"
          },
          {
            y: this.march,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "4": {
        this.signData = [{
            y: this.april_Calls,
            label: "Produced Calls"
          },
          {
            y: this.april,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "5": {
        this.signData = [{
            y: this.may_Calls,
            label: "Produced Calls"
          },
          {
            y: this.may,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "6": {
        this.signData = [{
            y: this.june_Calls,
            label: "Produced Calls"
          },
          {
            y: this.june,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "7": {
        this.signData = [{
            y: this.july_Calls,
            label: "Produced Calls"
          },
          {
            y: this.july,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "8": {
        this.signData = [{
            y: this.aug_Calls,
            label: "Produced Calls"
          },
          {
            y: this.aug,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "9": {
        this.signData = [{
            y: this.sep_Calls,
            label: "Produced Calls"
          },
          {
            y: this.sep,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "10": {
        this.signData = [{
            y: this.oct_Calls,
            label: "Produced Calls"
          },
          {
            y: this.oct,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "11": {
        this.signData = [{
            y: this.nov_Calls,
            label: "Produced Calls"
          },
          {
            y: this.nov,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      case "12": {
        this.signData = [{
            y: this.dec_Calls,
            label: "Produced Calls"
          },
          {
            y: this.dec,
            label: "Total Signs Placed"
          },
        ]
        break;
      }
      default: {
        console.log('we arent reaching anywhere');
        break;
      }

    }
    new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Client Statistics"
      },
      data: [{
        type: "column",
        dataPoints: this.signData
      }]
    }).render();
  }

  goBack() {
    this._location.back();
  }

}
