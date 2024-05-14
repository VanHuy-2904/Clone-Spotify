import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription, debounceTime, switchMap } from 'rxjs';
import { AlbumDetail } from '../../Service/album/album-detail.i';
import { Artist } from '../../Service/artist/Artists';
import { TopTrack } from '../../Service/data/top-track.i';
import { TrackDetail } from '../../Service/music/track-detail.i';
import { PlaylistInfo } from '../../Service/playlist/playlist-detail.i';
import { Playlist } from '../../Service/playlist/playlist.i';
import { Search } from '../../Service/search/search.i';
import { SearchService } from '../../Service/search/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  data!: Playlist;
  searchValue = '';
  dataArtist = new Artist();
  dataTrack: TrackDetail[] = [];
  dataAlbum: AlbumDetail[] = [];
  dataPlaylist: PlaylistInfo[] = [];
  dataArtistRea: Artist[] = [];
  dataArtistSub!: Subscription;
  dataAlbumSub!: Subscription;
  dataTrackSub!: Subscription;
  dataFeatureSub!: Subscription;
  searchSub!: Subscription;
  constructor(
    private http: HttpClient,
    private searchService: SearchService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.searchService.setSearchB(true);
    this.searchService
      .getInput()
      .pipe(
        debounceTime(1000),
        switchMap((input: string) => {
          if (input) {
            this.searchValue = input;
            return this.searchService.searchRS(input, 'artist');
          } else {
            this.searchValue = '';
            return this.searchService.getFeature();
          }
        }),
      )
      .subscribe((data) => {
        if (this.searchValue) {
          this.dataArtist = data.artists.items[0];
          this.searchService
            .searchRS(this.searchValue, 'playlist')
            .subscribe((data: Search) => {
              if (data) {
                const playlistRandom = data.playlists.items.sort(
                  () => Math.random() - 0.5,
                );
                this.dataPlaylist = playlistRandom.slice(0, 7);
              }
            });
          this.searchService
            .searchRS(this.searchValue, 'artist')
            .subscribe((dataA: Search) => {
              if (data) {
                const artistRandom = dataA.artists.items.sort(
                  () => Math.random() - 0.5,
                );
                this.dataArtistRea = artistRandom.slice(0, 7);
              }
            });
          this.dataTrackSub = this.searchService
            .getTrackRS(this.dataArtist.id)
            .subscribe((dataTrack: TopTrack) => {
              const albumRandom = dataTrack.tracks.sort(
                () => Math.random() - 0.5,
              );

              this.dataTrack = albumRandom.slice(0, 4);
              this.dataAlbumSub = this.searchService
                .searchRS(this.searchValue, 'album')
                .subscribe((dataAlbum: Search) => {
                  const albumRandom = dataAlbum.albums.items.sort(
                    () => Math.random() - 0.5,
                  );
                  this.dataAlbum = albumRandom.slice(0, 7);
                });
            });
        } else {
          this.data = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.searchService.setSearchB(false);
    if (this.dataAlbumSub) {
      this.dataAlbumSub.unsubscribe();
    }
    if (this.dataArtistSub) {
      this.dataArtistSub.unsubscribe();
    }
    if (this.dataTrackSub) {
      this.dataTrackSub.unsubscribe();
    }
    if (this.dataFeatureSub) {
      this.dataFeatureSub.unsubscribe();
    }
  }
}
