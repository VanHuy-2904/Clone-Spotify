import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private spotifyApiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(`${environment.apiConfig}/me/playlists`, { headers });
  }

  getPlaylist(idPlaylist: string): Observable<any> {
    return this.http.get(
      environment.apiConfig + `/playlists/${idPlaylist}/tracks`,
    );
  }

  getInfoPlaylist(id: string): Observable<any> {
    return this.http.get(environment.apiConfig + `playlists/${id}`);
  }

  getPicture(id: string) {
    return this.http.get(environment.apiConfig + `/playlists/${id}/images`);
  }

  getMyPlaylist(): Observable<any> {
    return this.http.get(environment.apiConfig + '/me/playlists ');
  }
}
