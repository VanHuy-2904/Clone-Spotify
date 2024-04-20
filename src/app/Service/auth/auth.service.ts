import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: any;
  refreshToken: any;
  userNameSubject$ = new BehaviorSubject('');
  userName$ = this.userNameSubject$.asObservable();
  nameUser: string;
  tokenUrl = 'https://accounts.spotify.com/api/token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.accessToken = '';
    this.refreshToken = '';
    this.nameUser = '';
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  login() {
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${environment.clientId}&response_type=code&redirect_uri=${environment.redirectUri}&scope=${environment.scope}&state=${environment.state}`;
    window.location.href = authorizeUrl;
    // window.location.reload();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nameUser');
    this.http.post(this.tokenUrl, `token=${this.accessToken}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  exchangeCode(code: string): Observable<any> {
   
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${environment.redirectUri}`;

    const headers = new HttpHeaders({
      Authorization:
        'Basic ' +
        btoa(environment.clientId + ':' + environment.clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(this.tokenUrl, body, { headers });
  }

  refreshAccessToken(): Observable<any> {
    const body = `grant_type=refresh_token&refresh_token=${localStorage.getItem('refreshToken')}&client_id=${environment.clientId}&client_secret=${environment.clientSecret}`;

    return this.http.post(environment.apiConfig, body);
  }

  getUserinfo(token: any): Observable<any> {
    return this.http.get(environment.apiConfig + '/me',);
  }

}
