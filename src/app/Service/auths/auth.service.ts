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
  refresh_token: any;
  userNameSubject$ = new BehaviorSubject('');
  userName$ = this.userNameSubject$.asObservable();
  nameUser: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.accessToken = '';
    this.refresh_token = '';
    this.nameUser = '';
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  login() {
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${environment.client_id}&response_type=code&redirect_uri=${environment.redirect_uri}&scope=${environment.scope}&state=${environment.state}`;
    window.location.href = authorizeUrl;
    // window.location.reload();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nameUser');
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    this.http.post(tokenUrl, `token=${this.accessToken}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  exchangeCode(code: string): Observable<any> {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = `grant_type=authorization_code&code=${code}&redirect_uri=${environment.redirect_uri}`;

    const headers = new HttpHeaders({
      Authorization:
        'Basic ' +
        btoa(environment.client_id + ':' + environment.client_secret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(tokenUrl, body, { headers });
  }

  refreshAccessToken(): Observable<any> {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&client_id=${environment.client_id}&client_secret=${environment.client_secret}`;

    return this.http.post(tokenUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  getUserinfo(token: any): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getUser(): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
