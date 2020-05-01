import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { DataServiceService } from 'src/app/services/data-service.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-point-popover',
  templateUrl: './point-popover.component.html',
  styleUrls: ['./point-popover.component.scss']
})
export class PointPopoverComponent implements OnInit {
  pointGraphic: any = null;
  // Have to make color array into a string
  colors = [
    {name: 'Active', value: [0, 153, 255].join(', '), effective: true},
    {name: 'Inactive', value: [226, 119, 40].join(', '), effective: false}
  ];
  colorForm = new FormGroup({
    color: new FormControl('', [Validators.required])
  });

  map: any;

  constructor(
    public dialogRef: MatDialogRef<PointPopoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataServiceService,
    private snackBar: MatSnackBar
  ) {

    this.pointGraphic = data;
    const colorRef = this.pointGraphic.symbol.color;
    console.log({color: _.find(this.colors, (col) => col.value === [colorRef.r, colorRef.g, colorRef.b].join(', ')).value});
    this.colorForm.patchValue({color: _.find(this.colors, (col) => col.value === [colorRef.r, colorRef.g, colorRef.b].join(', ')).value});
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  deletePoint(): void {
    const point = _.omit(this.pointGraphic.attributes, '__v');
    console.log(point);
    this.dataService.deletePoint(point).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close('deleted');
        this.openSnackBar(`Point ${point._id} has been deleted successfully!`);
      },
      (error) => {
        console.log(error);
        this.openSnackBar(`Error: a server error has occured!`);
      }
    );
  }

  saveChanges(): void {
    const point = _.omit(this.pointGraphic.attributes, '__v');
    point.effective = _.find(this.colors, (color) => this.colorForm.value.color === color.value).effective;
    console.log(point, this.colorForm.value);
    this.dataService.updatePoint(point).pipe(take(1)).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close('updated');
        this.openSnackBar(`Point ${point._id} has updated successfully!`);
      },
      (error) => {
        console.log(error);
        this.openSnackBar(`Error: a server error has occured!`);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
