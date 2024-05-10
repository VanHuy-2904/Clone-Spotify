import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Playlist } from '../playlist/playlist.i';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private inputValue$ = new BehaviorSubject('');
  data$ = this.inputValue$.asObservable();

  private searchB$ = new BehaviorSubject<boolean>(false);
  searchB = this.searchB$.asObservable();
  constructor(private http: HttpClient) {}

  setInputValue(input: string) {
    this.inputValue$.next(input);
  }

  getInput() {
    return this.data$;
  }

  setSearchB(input: boolean) {
    this.searchB$.next(input);
  }

  getSearchB():Observable<boolean> {
    return this.searchB;
  }

  getFeature(): Observable<Playlist> {
    return this.http.get<Playlist>(
      `https://api.spotify.com/v1/browse/featured-playlists?locale=VN`,
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

  searchRS(input: string, type: string): Observable<any> {
    return this.http.get(
      `https://api.spotify.com/v1/search?q=${input}&type=${type}`,
    );
  }

  getTrackRS(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`);
  }

  getAlbumRS(input: string): Observable<any> {
    return this.http.get( `https://api.spotify.com/v1/artists/${input}/albums`,);
  }
  getArtistRelated(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/related-artists`)
  }
  getPlaylistArtist(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/search?q=${id}&type=playlist
    `)
  }
}
