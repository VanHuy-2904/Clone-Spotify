import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private inputValue$ = new BehaviorSubject('');
  data$ = this.inputValue$.asObservable();
  constructor(private http: HttpClient) {}

  setInputValue(input: string) {
    this.inputValue$.next(input);
  }

  getInput() {
    return this.data$;
  }

  getFeature(): Observable<any> {
    return this.http.get(
      environment.apiConfig + `/browse/featured-playlists?locale=VN`,
    );
  }

  // getSearchValue(input: string): Observable<any> {
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
      environment.apiConfig + `/search?q=${input}&type=artist`,
    );
  }

  getTrackRS(id: string): Observable<any> {
    return this.http.get(environment.apiConfig + `/artists/${id}/top-tracks`);
  }

  getAlbumRS(id: string): Observable<any> {
    return this.http.get(environment.apiConfig + `/artists/${id}/albums`);
  }
}
