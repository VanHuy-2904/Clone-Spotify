import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchSerive {
  private inputvalue$ = new BehaviorSubject('');
  data$ = this.inputvalue$.asObservable();
  constructor(private http: HttpClient) {}

  setinputvalue(input: string) {
    this.inputvalue$.next(input);
  }

  getinput() {
    return this.data$;
  }

  getfeature(): Observable<any> {
    return this.http.get(
      `https://api.spotify.com/v1/browse/featured-playlists?locale=VN`,
    );
  }

  // getsearchvalue(input: string): Observable<any> {
  //   return this.http.get(
  //     `https://api.spotify.com/v1/search?q=${input}&type=artist`,
  //     {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       }),
  //     },
  //   );
  // }

  getArtistRS(input: string): Observable<any> {
    return this.http.get(
      `https://api.spotify.com/v1/search?q=${input}&type=artist`,
    );
  }

  getTrackRS(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`);
  }

  getAlbumRS(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/albums`);
  }
}
