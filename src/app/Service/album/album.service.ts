import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbumNew():Observable<any> {
    return this.http.get('https://api.spotify.com/v1/browse/new-releases')
  }
}
