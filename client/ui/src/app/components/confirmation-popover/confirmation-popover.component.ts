import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popover',
  templateUrl: './confirmation-popover.component.html',
  styleUrls: ['./confirmation-popover.component.scss']
})
export class ConfirmationPopoverComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopoverComponent>
  ) {}

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close();
  }

  savePoint(ev: any) {
    this.dialogRef.close('confirm');
  }

}
