import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  testServer() {
    return this.http.get('http://localhost:3000/test/');
  }

  getUserDetail(){
    //post these details to API server return user info if correct.
  }
}
