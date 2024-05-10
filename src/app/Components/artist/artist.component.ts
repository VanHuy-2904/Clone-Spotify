import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Service/auth/auth.service';
import { MusicService } from '../../Service/music/music.service';
import { Artist } from '../../Service/artist/Artists';
import { Track } from '../../Service/music/track';
import { DataService } from '../../Service/data/data.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
  token: any;
  getArtistSubscription!: Subscription
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private music: MusicService,
    private authService: AuthService,
    private dataService: DataService,
  ) {}
  listItems: Track[] = [];
  artist!: Artist;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {      
      const id = params['id'];
      console.log(id);
      this.getArtist(id);
      this.getAlbum(id);
    });
  }

  updateData(track: Track) {
    this.dataService.updateData(track);
  }

  getAlbum(id: string) {
    this.dataService.getAlbum(id).subscribe((data: any) => {
      console.log('data tracks: ', data);
      this.listItems = data.tracks;
    });
  }

  format(milliseconds: number) {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(
      milliseconds,
    );
  }

  getArtist(id: string) {
 this.getArtistSubscription =   this.dataService.getArtist(id).subscribe((data: any) => {
      this.artist = data;
    });
  }
}
