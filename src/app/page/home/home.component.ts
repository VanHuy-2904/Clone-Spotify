import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistComponent } from '../../Components/artist/artist.component';
import { Artist } from '../../Service/artist/Artists';
import { AuthService } from '../../Service/auth/auth.service';
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
  constructor(private authService: AuthService) {
    this.tracks = [];
    this.id = ''
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const expiresInStr = localStorage.getItem('expiresIn');
      const expiresIn = (Number(expiresInStr) - 30) * 1000;
      setInterval(() => {
        this.authService
          .refreshAccessToken()
          .subscribe(
            (data: { access_token: string; refresh_token: string }) => {
              this.authService.setToken(data.access_token);
            },
          );
      }, expiresIn);
    }
  }

  login() {
    this.authService.login();
  }

  handelClick() {
    this.authService.login();
  }
}
