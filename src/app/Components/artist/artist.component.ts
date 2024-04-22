import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artist } from '../../Service/artist/Artists';
import { AuthService } from '../../Service/auth/auth.service';
import { DataService } from '../../Service/data/data.service';
import { MusicService } from '../../Service/music/music.service';
import { Track } from '../../Service/music/track';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit {
  token: string = '';
  getArtistSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private music: MusicService,
    private authService: AuthService,
    private artistService: DataService,
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
    this.artistService.updateData(track);
  }

  getAlbum(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.artistService.getAlbum(id).subscribe((data: any) => {
      this.listItems = data.tracks;
    });
  }

  format(milliseconds: number) {
    return this.artistService.formatMillisecondsToMinutesAndSeconds(
      milliseconds,
    );
  }

  getArtist(id: string) {
    this.getArtistSubscription = this.artistService
      .getArtist(id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.artist = data;
      });
  }
}
