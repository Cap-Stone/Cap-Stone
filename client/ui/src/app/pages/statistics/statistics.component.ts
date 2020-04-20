import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';


interface myData{
  obj: Object
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})


export class StatisticsComponent implements OnInit {

  dataPoints = [];
  constructor(private myDataService : DataServiceService) { 

  }
 
  ngOnInit() {
    
    }

  }

