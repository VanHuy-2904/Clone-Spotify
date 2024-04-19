import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MusicData } from './music.i';
import { Track } from './track';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
   dataSubject = new BehaviorSubject<Track | null>(null);
    data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  // getData() {
  //   return this.data$;
  // }

  updateData(data: Track) {
    this.dataSubject.next(data);
  }

  playTrack(track: Track, progress_ms: number): Observable<any> {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {
      // context_uri: 'spotify:album:1FbCsMN3QbJzyChn0JpPf7',
      uris: [track.uri],
      "position_ms": progress_ms
    });
  }

  pauseTrack():Observable<any> {
    return this.http.put('https://api.spotify.com/v1/me/player/pause', {})
  }

  getTopTrack(): Observable<any> {
    const params = new HttpParams().set('country', 'VN');
    return this.http.get('https://api.spotify.com/v1/me/top/tracks', {
      params,
    });
  }

  getCurrentPlaying(): Observable<any> {
    return this.http.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
    );
  }

  getTrack(id:string):Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/tracks/${id}`)
  }
}
