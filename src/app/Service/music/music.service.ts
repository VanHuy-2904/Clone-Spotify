import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MusicData } from './music.i';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  getData() {
    return this.data$;
  }

  updateData(data: MusicData) {
    this.dataSubject.next([]);
    this.dataSubject.next([...this.dataSubject.getValue(), data]);
  }
  playMusic() {
    if(localStorage.getItem('token')) {

      this.http
        .get(environment.apiConfig + '/tracks/11dFghVXANMlKmJXsNCbNl')
        .subscribe({
          next: (res) => {
         
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
