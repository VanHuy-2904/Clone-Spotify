import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { Playlist } from '../playlist/playlist.i';
import { TrackDetail } from './track-detail.i';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  dataSubject = new BehaviorSubject<TrackDetail | null>(null);
  data$ = this.dataSubject.asObservable();
  playSubject = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  // getData() {
  //   return this.data$;
  // }
  getData(): Observable<TrackDetail | null> {
    this.updateData();
    return this.data$;
  }

  updateData() {
    const storedDataString = localStorage.getItem('trackCurrent');

    if (storedDataString !== null) {
      const storedData: TrackDetail = JSON.parse(storedDataString!);
      if (storedData) this.dataSubject.next(storedData);
    }
  }

  playTrack(uri: string, progress_ms: number): Observable<object> {
    return this.http.put(
      environment.apiConfig + environment.apiPaths.playMusic,
      {
        // context_uri: 'spotify:album:1FbCsMN3QbJzyChn0JpPf7',
        uris: [uri],
        position_ms: progress_ms,
      },
    );
  }

  pauseTrack(): Observable<object> {
    return this.http.put(
      environment.apiConfig + environment.apiPaths.pauseMusic,
      {},
    );
  }

  getTopTrack(): Observable<Playlist> {
    const params = new URLSearchParams({
      locale: 'VN',
      limit: '10',
    });
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.topTrack + `?${params}`,
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentPlaying(): Observable<any> {
    return this.http.get(
      environment.apiConfig + environment.apiPaths.currentPlay,
    );
  }

  getTrack(id: string): Observable<TrackDetail> {
    return this.http.get<TrackDetail>(
      environment.apiConfig + environment.apiPaths.getTrack(id),
    );
  }
}
