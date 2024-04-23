import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPlaylists(): Observable<any> {
    return this.http.get(`${environment.apiConfig}/me/playlists`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPlaylist(idPlaylist: string): Observable<any> {
    return this.http.get(
      environment.apiConfig + `/playlists/${idPlaylist}/tracks`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getInfoPlaylist(id: string): Observable<any> {
    return this.http.get(environment.apiConfig + `playlists/${id}`);
  }

  getPicture(id: string) {
    return this.http.get(environment.apiConfig + `/playlists/${id}/images`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMyPlaylist(): Observable<any> {
    return this.http.get(environment.apiConfig + '/me/playlists ');
  }
}
