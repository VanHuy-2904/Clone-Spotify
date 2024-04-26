import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { Track } from './track';

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
  playMusic() {
    if (localStorage.getItem('token')) {
      this.http
        .get(environment.apiConfig + '/tracks/11dFghVXANMlKmJXsNCbNl')
        .subscribe({
          next: () => {},
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCurrentPlaying(): Observable<any> {
    return this.http.get(
      `${environment.apiConfig} + /me/player/currently-playing`,
    );
  }
}
