import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistComponent } from '../../Components/artist/artist.component';
import { Album } from '../../Service/album/album';
import { AlbumService } from '../../Service/album/album.service';
import { Artist } from '../../Service/artist/Artists';
import { AuthService } from '../../Service/auth/auth.service';
import { MusicService } from '../../Service/music/music.service';
import { Track } from '../../Service/music/track';
import { PlayList } from '../../Service/playlist/playlist.i';
// import { Login } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, ArtistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  tracks: Track[] = [];
  topTracks: PlayList[] = [];
  token!: string | null;
  artists: Artist[] = [];
  id: string;
  albumNew: Album[] = [];
  getTopTrack!: Subscription;
  getAlbumSub!: Subscription;
  constructor(
    private albumService: AlbumService,
    private authService: AuthService,
    private musicService: MusicService,
  ) {
    this.tracks = [];
    this.id = '';
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.getTopTrack = this.musicService
        .getTopTrack()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .subscribe((data: any) => {
          this.topTracks = data.playlists.items;
          this.getAlbumSub = this.albumService
            .getAlbumNew()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .subscribe((data: any) => {
              this.albumNew = data.albums.items.map((item: Album) => ({
                id: item.id,
                name: item.name,
                images: item.images,
                artists: item.artists,
                uri: item.uri,
              }));
            });
        });
    }
  }

  ngOnDestroy(): void {
    this.getTopTrack.unsubscribe();
    this.getAlbumSub.unsubscribe();
  }

  handelClick() {
    this.authService.login();
  }
}
