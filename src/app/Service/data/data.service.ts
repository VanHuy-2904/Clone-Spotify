import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MusicService } from '../music/music.service';
import { Track } from '../music/track';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private music: MusicService,
  ) {}
  updateData(track: Track) {
    const newData = track;

    this.music.updateData(newData);
  }

  formatMillisecondsToMinutesAndSeconds(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getArtist(id: string): Observable<any> {
    return this.http.get(
      environment.apiConfig + environment.apiPaths.getArtist(id),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTrackAlbum(id: string): Observable<any> {
    return this.http.get(
      environment.apiConfig + environment.apiPaths.getTrackAlbum(id),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAlbumDetail(id: string): Observable<any> {
    return this.http.get(
      environment.apiConfig + environment.apiPaths.getAlbumDetail(id),
    );
  }
}
