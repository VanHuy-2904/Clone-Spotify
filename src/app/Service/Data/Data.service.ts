import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicService } from '../music/Music.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class datatService {
  constructor(
    private http: HttpClient,
    private music: MusicService,
  ) {}
  updatedata(name: string, artist: string, img: string, id: string) {
    const newdata = { name, artist, img, id };

    this.music.updatedata(newdata);
    console.log(name);
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

  gettrackAlbum(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/albums/${id}/tracks`);
  }

  getalbumdetail(id: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/albums/${id}`);
  }
}
