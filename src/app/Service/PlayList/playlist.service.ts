import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.spotifyApiUrl}/me/playlists`, { headers });
  }

  getplaylist(idplaylist: string): Observable<any> {
    return this.http.get(
      `https://api.spotify.com/v1/playlists/${idplaylist}/tracks`,
    );
  }

  getinfoPlaylist(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/playlists/${id}`);
  }

  getPicture(id: string) {
    return this.http.get(
      `
  https://api.spotify.com/v1/playlists/${id}/images`,
    );
  }

  getmyPlaylist(): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/me/playlists ');
  }
}
