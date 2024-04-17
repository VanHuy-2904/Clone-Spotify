
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MusicData } from './music.i';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  getData() {
    return this.data$;
  }

  updateData(data: MusicData) {
    this.dataSubject.next([]);
    this.dataSubject.next([...this.dataSubject.getValue(), data]);
  }
  playMusic() {
    console.log(localStorage.getItem('token'));

    // Make a GET request to Spotify API to play the track
    this.http
      .get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl')
      .subscribe(
        (response) => {
          console.log('Track is now playing:', response);
        },
        (error) => {
          console.error('Error playing track:', error);
        },
      );
  }

  getTopTrack():Observable<any> {
   const params = new HttpParams().set('country', 'VN');
    return this.http.get('https://api.spotify.com/v1/me/top/tracks', {params})
  }
}

