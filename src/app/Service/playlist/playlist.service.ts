import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Playlist } from './playlist.i';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylist(idPlaylist: string): Observable<Playlist> {
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.getPlaylist(idPlaylist),
    );
  }

  getInfoPlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.infoPlaylist(id),
    );
  }

  getPicture(id: string) {
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.picturePlaylist(id),
    );
  }

  getMyPlaylist(): Observable<Playlist> {
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.mePlaylist,
    );
  }
}
