import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Service/auth/Auth.service';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from '../../Components/artist/artist.component';
import { MusicService } from '../../Service/music/Music.service';
import { Subscription } from 'rxjs';
import { Artist } from '../../Service/Artists';
import { Track } from '../../Service/Tracks';
// import { Login } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ArtistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tracks: Track[] = [];
  toptracks: Track[] = [];
  token!: string | null;
  artists: Artist[] = [];
  id: string;
  getAlbumSub!: Subscription
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
   
  }

  handelClick() {
    this.authservice.login();
  }

  
}
