import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface myData{
  obj: Array<Object>
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private _loginUrl = 'http://localhost:3000/api/login'
  private _registerUrl = 'http://localhost:3000/api/register';
  private _savePointsUrl = 'http://localhost:3000/api/savePointsUrl';
  private _getPointsUrl = 'http://localhost:3000/api/getPointsUrl';
  private _updatePointUrl = 'http://localhost:3000/api/updatePointUrl';
  private _deletePointUrl = 'http://localhost:3000/api/deletePoint';
  isLoggedIn = false;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  logOut() {
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }

  testServer() {
    return this.http.get('http://localhost:3000/test/');
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap(result => {
        console.log('TAP RESULT: ', result);
        this.isLoggedIn = true;
      })
    );
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  savePoint(points) {
    return this.http.post<any>(this._savePointsUrl, points);
  }

  getPoints() {
    return this.http.get<any>(this._getPointsUrl);
  }

  updatePoint(point: any): Observable<any> {
    return this.http.post<any>(this._updatePointUrl, point);
  }

  deletePoint(point) {
    return this.http.post<any>(this._deletePointUrl, point);
  }
}

