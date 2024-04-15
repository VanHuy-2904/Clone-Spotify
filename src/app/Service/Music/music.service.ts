import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { BehaviorSubject } from 'rxjs';
interface MusicData {
  name: string;
  artist: string;
  img: string;
  id: string;
}
@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authservice: AuthService,
  ) {}
  getData() {
    return this.data$;
  }

  updatedata(data: MusicData) {
    this.dataSubject.next([]);
    this.dataSubject.next([...this.dataSubject.getValue(), data]);
  }
  playmusic() {
    console.log(localStorage.getItem('token'));

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    // Make a GET request to Spotify API to play the track
    this.http
      .get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl ', {
        headers,
      })
      .subscribe(
        (response) => {
          console.log('Track is now playing:', response);
        },
        (error) => {
          console.error('Error playing track:', error);
        },
      );
  }

  
}
