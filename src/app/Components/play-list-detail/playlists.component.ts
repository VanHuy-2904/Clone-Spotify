import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { images } from '../../Service/album/album';
import { DataService } from '../../Service/data/data.service';
import { Device } from '../../Service/music/device.i';
import { MusicService } from '../../Service/music/music.service';
import { Item } from '../../Service/music/track';
import { TrackDetail } from '../../Service/music/track-detail.i';
import {
  PlaylistDetail,
  PlaylistInfo,
} from '../../Service/playlist/playlist-detail.i';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { MyPlaylistComponent } from '../my-playlist/my-playlist.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [FormsModule, CommonModule, MyPlaylistComponent, RouterLink],
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
  user: boolean = false;
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
      if (data.owner.id !== 'spotify')
        if (data) {
          this.user = true;
        } else {
          this.user = false;
        }
      this.playlistService.getPicture(id).subscribe((data: images[]) => {
        if (data.length) this.imgUrl = data[0].url;
      });
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
}
