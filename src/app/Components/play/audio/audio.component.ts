import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options, SliderComponent } from 'ngx-slider-v2';
import { AuthService } from '../../../Service/auths/auth.service';
import { MusicService } from '../../../Service/musics/music.service';
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
    private authService: AuthService,
    private musicService: MusicService,
  ) {}

  play: boolean = false;
  ngOnInit(): void {
    console.log(localStorage.getItem('token'));

    this.musicService.playMusic();
    this.getCurrentPlaying().subscribe((data) => {
      console.log(data);
    });

    this.dataSubscription = this.musicService
      .getData()
      .subscribe((data: any) => {
        this.data = data;
        console.log('name music:', data);
      });
  }
  

  accessToken: string = ''; // Access token received after user authentication
  trackUrl: string = 'SPOTIFY_TRACK_URL'; // Spotify track URL
  getCurrentPlaying(): Observable<any> {
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
  handleClick() {
    this.play = !this.play;
    console.log(this.play);
  }
}
