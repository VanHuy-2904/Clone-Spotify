import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { Track } from './track';
import { Playlist } from '../playlist/playlist.i';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private dataSubject = new BehaviorSubject<Track[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  getData() {
    return this.data$;
  }

  updateData(data: Track) {
    this.dataSubject.next([]);
    this.dataSubject.next([...this.dataSubject.getValue(), data]);
  }

  getTopTrack(): Observable<Playlist> {
    // const params = new HttpParams().set('country', 'VN');
    const params = new URLSearchParams({
      locale: 'VN',
      limit: '10',
    });
    return this.http.get<Playlist>(
      environment.apiConfig + environment.apiPaths.topTrack + `?${params}`,
    );
  }
}
