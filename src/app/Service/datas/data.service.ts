import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicService } from '../musics/music.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private music: MusicService,
  ) {}
  updateData(
    nameTrack: string,
    artistTrack: string,
    imgTrack: string,
    idTrack: string,
  ) {
    const newData = { nameTrack, artistTrack, imgTrack, idTrack };

    this.music.updateData(newData);
  }

  getAlbum(id: string) {
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`);
  }

  formatMillisecondsToMinutesAndSeconds(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  }

  getArtist(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/artists/${id}`);
  }

  getTrackAlbum(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/albums/${id}/tracks`);
  }

  getAlbumDetail(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/albums/${id}`);
  }
}
