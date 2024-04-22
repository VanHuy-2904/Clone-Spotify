import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from 'ngx-slider-v2';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../Service/auth/auth.service';
import { MusicService } from '../../../Service/music/music.service';
import { Track } from '../../../Service/music/track';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxSliderModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
})
export class AudioComponent implements OnInit {
  data: Track[] = [];
  private dataSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private musicService: MusicService,
  ) {}

  play: boolean = false;
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.musicService.playMusic();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.getCurrentPlaying().subscribe((data) => {});

      this.dataSubscription = this.musicService
        .getData()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .subscribe((data: any) => {
          this.data = data;
        });
    }
  }

  accessToken: string = ''; // Access token received after user authentication
  trackUrl: string = 'SPOTIFY_TRACK_URL'; // Spotify track URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
