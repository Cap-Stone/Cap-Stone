import { Component } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public dataservice: DataServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    // let currentUrl = this.router.url;
    // console.log('ROUTE: ', currentUrl);
  }

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

  settings() {
    console.log('Settings option has been clicked');
  }

  title = 'ui';
}
