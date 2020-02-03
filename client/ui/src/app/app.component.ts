import { Component } from '@angular/core';
import { DataServiceService } from './services/data-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public dataservice: DataServiceService,
  ) {}

  clicked() {
    this.dataservice.testServer().subscribe(
      (result) => {
        console.log('RESULT: ', result);
      },
      (error) => {
        console.log('ERROR: ', error);
      }
    )
  }

  title = 'ui';
}
