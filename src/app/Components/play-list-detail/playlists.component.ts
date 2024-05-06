import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../Service/data/data.service';
import { MusicService } from '../../Service/music/music.service';
import {
  PlaylistDetail,
  PlaylistInfo,
} from '../../Service/playlist/playlist-detail.i';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { Item } from '../../Service/music/track';
import { TrackDetail } from '../../Service/music/track-detail.i';
import { Device } from '../../Service/music/device.i';
import { images } from '../../Service/album/album';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  imgUrl = '';
  infoPlaylist!: PlaylistInfo;
  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private dataService: DataService,
    private musicService: MusicService,
  ) {}
  data!: PlaylistDetail;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if (code) {
        this.playlistService
          .getPlaylist(code)
          .subscribe((playlists: PlaylistDetail) => {
            this.data = playlists;
            this.getInfoPlaylist(code);
          });
      }
    });
  }
  format(milliseconds: number): string {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
  }

  getInfoPlaylist(id: string) {
    this.playlistService.getInfoPlaylist(id).subscribe((data: PlaylistInfo) => {
      this.infoPlaylist = data;
      this.playlistService.getPicture(id).subscribe((data: images[]) => {
        this.imgUrl = data[0].url;
      });
    });
  }

  updateData(currentTrack: Item) {
    const dataTrackCurrent = JSON.stringify(currentTrack);
    localStorage.setItem('trackCurrent', dataTrackCurrent);
    this.musicService.updateData();
    this.musicService.playSubject.next(true);
  }

  playTrack(id: string, uri: string) {
    localStorage.setItem('currentPlay', 'true');

    this.musicService.getTrack(id).subscribe((data: TrackDetail) => {
      const dataString = JSON.stringify(data);
      localStorage.setItem('trackCurrent', dataString);
    });
    this.musicService.getDevice().subscribe((data: Device) => {
      this.musicService
        .playTrack(uri, 0, data.devices[0].id)
        .subscribe(() => {});
    });
  }
}
