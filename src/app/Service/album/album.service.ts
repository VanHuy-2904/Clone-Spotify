import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from './album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbumNew(): Observable<Album> {
    return this.http.get<Album>(
      'https://api.spotify.com/v1/browse/new-releases',
    );
  }
}
