import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private spotifyApiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.spotifyApiUrl}/me/playlists`, { headers });
  }
}