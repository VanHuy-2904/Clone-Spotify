import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  client_id = '87ac444283e74b2caa2a9be4134a8d67';
  client_secret = '0b8b21dbb9d84255ad0c94681ae3d56e';
  redirect_uri = 'http://localhost:4200';
  scope = 'user-read-private user-read-email user-modify-playback-state user-read-currently-playing user-library-read';
  state = '123';
  accessToken: any;
  refresh_token: any;
  userNameSubject$ = new BehaviorSubject('')
  userName$ = this.userNameSubject$.asObservable()
  nameuser: string;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute){
    this.accessToken =""
    this.refresh_token= ""
    this.nameuser = ''
  }


  
 Login() {

  const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=code&redirect_uri=${this.redirect_uri}&scope=${this.scope}&state=${this.state}`;
      window.location.href = authorizeUrl;
  }

  logout() {
 localStorage.removeItem('token')
    // localStorage.removeItem('nameuser')
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  this.http.post(tokenUrl, `token=${this.accessToken}`, {
    headers : new  HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'

    })
  })
 }
 
exchangecode(code: string): Observable<any> {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
 
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${this.redirect_uri}`;
  
  return this.http.post(tokenUrl, body, {
    headers: new HttpHeaders({
        Authorization:
            'Basic  ' + btoa(this.client_id + ':' + this.client_secret),
        'Content-Type': 'application/x-www-form-urlencoded;',
    }),
})


}

refreshAccessToken():Observable<any> {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const body = `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&client_id=${this.client_id}&client_secret=${this.client_secret}`;

   return this.http.post(tokenUrl, body, {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })

}

 getuserinfo(token: any):Observable<any>  {
    return this.http.get('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
}



}
  
  
