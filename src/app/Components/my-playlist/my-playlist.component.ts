import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../Service/data/data.service';
import { TrackDetail } from '../../Service/music/track-detail.i';
import { ItemP, PlaylistInfo } from '../../Service/playlist/playlist-detail.i';
import { Item } from '../../Service/music/track';

import { PlaylistService } from '../../Service/playlist/playlist.service';
import { SearchService } from '../../Service/search/search.service';
import { MusicService } from '../../Service/music/music.service';
import { Device } from '../../Service/music/device.i';
import { EditInfoPlaylistComponent } from '../edit-info-playlist/edit-info-playlist.component';

@Component({
  selector: 'app-my-playlist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, EditInfoPlaylistComponent],
  templateUrl: './my-playlist.component.html',
  styleUrl: './my-playlist.component.scss',
})
export class MyPlaylistComponent implements OnInit {
  show: boolean = false;
  imgUrl = '';
  infoPlaylist!: PlaylistInfo;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private dataService: DataService,
    private searchService: SearchService,
    private musicService: MusicService,
  ) {}
  dataTrack!: TrackDetail[];
  searchValue: string = '';
  data!: ItemP[];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if (code) {
        this.playlistService.getPlaylist(code).subscribe((playlists) => {
          this.playlistService.updateData(playlists);
          // this.data = playlists.items;
          this.getPicture(code);
          this.getInfoPlaylist(code);
          this.searchService.getInput().subscribe((data) => {
            if (data) {
              this.searchService.searchRS(data, 'track').subscribe((data) => {
                this.dataTrack = data.tracks.items;
              });
            }
          });
        });
      }
    });
  }
  Format(milliseconds: number): string {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
  }

  getInfoPlaylist(id: string) {
    this.playlistService.getInfoPlaylist(id).subscribe((data) => {
      this.playlistService.data$.subscribe((data) => {
        if (data) this.data = data.items;
      });
      this.infoPlaylist = data;
    });
  }

  getPicture(id: string) {
    this.playlistService.getPicture(id).subscribe((data) => {
      if (data.length) this.imgUrl = data[0].url;
    });
  }

  onInputChange() {
    this.searchService.setInputValue(this.searchValue);
  }

  addTrackToPlaylist(uri: string) {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if (code) {
        this.playlistService.addTrackToPlaylist(code, uri).subscribe(() => {
          this.playlistService.getPlaylist(code).subscribe((data) => {
            this.playlistService.updateData(data);
          });
          this.playlistService.data$.subscribe((data) => {
            if (data) this.data = data.items;
          });
        });
      }
    });
  }

  removeTrack(uri: string) {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if (code) {
        this.playlistService
          .removeTrackFromPlaylist(code, uri)
          .subscribe(() => {
            this.playlistService.getPlaylist(code).subscribe((data) => {
              this.playlistService.updateData(data);
            });
            this.playlistService.data$.subscribe((data) => {
              if (data) this.data = data.items;
            });
          });
      }
    });
  }
  updateData(currentTrack: Item) {
    const dataTrackCurrent = JSON.stringify(currentTrack);
    localStorage.setItem('trackCurrent', dataTrackCurrent);
    this.musicService.updateData();
    this.musicService.playSubject.next(true);
  }

  playTrack(id: string, uri: string, i: number) {
    localStorage.setItem('currentPlay', 'true');
    // localStorage.removeItem('test');

    this.musicService.getTrack(id).subscribe((data: TrackDetail) => {
      const dataString = JSON.stringify(data);
      localStorage.setItem('trackCurrent', dataString);
    });
    this.musicService.getDevice().subscribe((data: Device) => {
      this.musicService
        .playList(uri, 0, data.devices[0].id, i)
        .subscribe(() => {});
    });
  }

  openEdit() {
    this.show = true;
    console.log(this.show);
  }
}
