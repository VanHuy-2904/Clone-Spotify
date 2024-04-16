import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from '../../Components/artist/artist.component';
import { Subscription } from 'rxjs';
import { Artist } from '../../Service/artist/Artists';
import { Track } from '../../Service/music/track';
import { DataService } from '../../Service/data/data.service';
import { Album } from '../../Service/album/album';
import { MusicService } from '../../Service/music/music.service';
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
  topTracks: Track[] = [];
  token!: string | null;
  artists: Artist[] = [];
  id: string;
  getTopTrack!: Subscription
  getAlbumSub!: Subscription
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {
    this.tracks = [];
    this.id = '';
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
   this.getTopTrack = this.musicService.getTopTrack().subscribe((data: any)=> {
    console.log(data);
    
      this.topTracks = data.items
    })    
  }

    ngOnDestroy(): void {
        this.getTopTrack.unsubscribe()
    }
  

  handelClick() {
    this.authService.login();
  }

  
}
