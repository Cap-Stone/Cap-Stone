import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private _location: Location,
    public dataService: DataServiceService,
    public sanitizer: DomSanitizer
  ) { }

  url: string = "https://benchmarkfamilyservices.org/";
  urlSafe: SafeResourceUrl;
  mobileDevice = false;
  opened: boolean;

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      this.mobileDevice = true;
    } 
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

  navigate() {
    window.open("https://benchmarkfamilyservices.org/");
  }

}
