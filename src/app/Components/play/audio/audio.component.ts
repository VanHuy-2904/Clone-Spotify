import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options, SliderComponent } from 'ngx-slider-v2';
import { AuthService } from '../../../Service/auth/Auth.service';
import { MusicService } from '../../../Service/music/Music.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent implements OnInit {
  data: any[] = [];
  private dataSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private musicservice: MusicService,
  ) {}

  play: boolean = false;
  ngOnInit(): void {
    console.log(localStorage.getItem('token'));

    this.musicservice.playmusic();
    this.getcurrentplaying().subscribe((data) => {
      console.log(data);
    });

    // Đăng ký subscription để theo dõi thay đổi trong dữ liệu
    this.dataSubscription = this.musicservice
      .getData()
      .subscribe((data: any) => {
        this.data = data;
        console.log('name music:', data);
      });
  }
  

  accessToken: string = ''; // Access token received after user authentication
  trackUrl: string = 'SPOTIFY_TRACK_URL'; // Spotify track URL
  getcurrentplaying(): Observable<any> {
    return this.http.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      },
    );

    // Make a GET request to Spotify API to play the track
  }
  handleclick() {
    this.play = !this.play;
    console.log(this.play);
  }
}
