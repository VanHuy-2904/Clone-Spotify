import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Service/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from '../../Components/artist/artist.component';
import { MusicService } from '../../Service/Music/music.service';
// import { Login } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ArtistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tracks: any[] = [];
  toptracks: any[] = [];
  token: any;
  artists: any[] = [];
  id: string;
  constructor(
    private http: HttpClient,
    private authservice: AuthService,
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {
    this.tracks = [];
    this.id = '';
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
     console.log(this.token);
    this.getartist();
    this.getTopTracks();
    this.getalbums();
  }

  handelClick() {
    this.authservice.login();
  }

  getalbums() {
    this.http
      .get(
        'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc',
        {
          headers: new HttpHeaders({
            Authorization: ` Bearer ${localStorage.getItem('token')
          })}`,
          }),
        },
      )
      .subscribe((data: any) => {
        console.log(data);
        this.tracks = data.albums;
        console.log('album', data.albums);
      });
  }

  getartist() {
    console.log(localStorage.getItem('token'));

    this.http
      .get(
        'https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6',
        {
          headers: new HttpHeaders({
            Authorization: ` Bearer ${localStorage.getItem('token')
          })}`,
          }),
        },
      )
      .subscribe((data: any) => {
        console.log(data);
        this.artists = data.artists;
      });
  }

  getTopTracks() {
    this.http
      .get(
        'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks',
        {
          headers: new HttpHeaders({
            Authorization: ` Bearer ${localStorage.getItem('token')
          })}`,
          }),
        },
      )
      .subscribe((data: any) => {
        console.log('1312321', data);
        this.toptracks = data.tracks;
        console.log('1312321', this.toptracks);
      });
  }
}
