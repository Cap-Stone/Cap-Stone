import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData{
  obj: Array<Object>
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private _loginUrl = "http://localhost:3000/api/login"
  private _registerUrl = "http://localhost:3000/api/register";
  
  constructor(
    private http: HttpClient,
  ) { }

  testServer() {
    return this.http.get('http://localhost:3000/test/');
  }

  loginUser(user)
  {
    return this.http.post<any>(this._loginUrl,user)
  }
  
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  }

