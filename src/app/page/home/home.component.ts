import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistComponent } from '../../Components/artist/artist.component';
import { Artist } from '../../Service/artist/Artists';
import { AuthService } from '../../Service/auth/auth.service';
import { MusicService } from '../../Service/music/music.service';
import { Track } from '../../Service/music/track';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ArtistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tracks: Track[] = [];
  topTracks: Track[] = [];
  token!: string | null;
  artists: Artist[] = [];
  id: string;
  getAlbumSub!: Subscription;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private musicService: MusicService,
  ) {
    this.tracks = [];
    this.id = '';
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  login() {
    this.authService.login();
  }

  handelClick() {
    this.authService.login();
  }
}
