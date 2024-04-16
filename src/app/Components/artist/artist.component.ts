import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Service/auth/Auth.service';
import { datatService } from '../../Service/data/Data.service';
import { MusicService } from '../../Service/music/Music.service';
import { Artist } from '../../Service/Artists';
import { Track } from '../../Service/Tracks';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
  token: any;
  getartistSubscription!: Subscription
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private music: MusicService,
    private authservice: AuthService,
    private artistService: datatService,
  ) {}
  listitems: Track[] = [];
  artist!: Artist;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.getartist(id);
      this.getalbum(id);
    });
  }

  updatedata(name: string, artist: string, img: string, id: string) {
    this.artistService.updatedata(name, artist, img, id);
  }

  getalbum(id: string) {
    this.artistService.getAlbum(id).subscribe((data: any) => {
      console.log('data tracks: ', data);
      this.listitems = data.tracks;
    });
  }

  format(milliseconds: number) {
    return this.artistService.formatMillisecondsToMinutesAndSeconds(
      milliseconds,
    );
  }

  getartist(id: string) {
 this.getartistSubscription =   this.artistService.getArtist(id).subscribe((data: any) => {
      this.artist = data;
    });
  }
}
