import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private spotifyApiUrl = 'https://api.spotify.com/v1';
  dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}
  updateData(data: any){
    this.dataSubject.next(data);
  }

  getPlaylists(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get(`${this.spotifyApiUrl}/me/playlists`, { headers });
  }

  getPlaylist(idPlaylist: string): Observable<any> {
    return this.http.get(
      `https://api.spotify.com/v1/playlists/${idPlaylist}/tracks`,
    );
  }

  getInfoPlaylist(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/playlists/${id}`);
  }

  getPicture(id: string) {
    return this.http.get(
      `
  https://api.spotify.com/v1/playlists/${id}/images`,
    );
  }

  getMyPlaylist(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/users/${id}/playlists`);
  }

  getTrackPlaylist(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/playlists/${id}/tracks`);
  }

  //thêm nhạc vào danh sách phát
  addTrackToPlaylist(id: string, uri: string): Observable<any> {
    return this.http.post(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      "uris": [uri]
    });
  }

  removeTrackFromPlaylist(playlistId: string, trackUri: string): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks
    `;
    const httpOptions = {
      // Truyền body dưới dạng đối tượng JSON chứa thông tin track cần xóa
      body: {
        tracks: [
          {
            uri: trackUri
          }
        ]
      }
    };

    // Gửi yêu cầu HTTP DELETE với các thông tin đã được thiết lập
    return this.http.delete(url, httpOptions);
  }
}
