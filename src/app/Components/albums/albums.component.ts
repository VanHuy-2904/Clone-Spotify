import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../../Service/music/track';
import { Album } from '../../Service/album/album';
import { Subscription } from 'rxjs';
import { MusicService } from '../../Service/music/music.service';
import { DataService } from '../../Service/data/data.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent implements OnInit, OnDestroy {
  track: Track[] = [];
  album!: Album;
  link: string;
  getAlbumSub!: Subscription;
  getTrackAlbumSub!: Subscription;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private musicService: MusicService,
    private dataService: DataService,
  ) {
    this.link = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getAlbum(id);
      this.getTrackAlbum(id);
    });
  }
  format(milliseconds: number): string {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
  }
  updateData(currentTrack: Track) {
    this.musicService.updateData(currentTrack);
  }

  getTrackAlbum(id: string) {
    this.getAlbumSub = this.getTrackAlbumSub = this.dataService
      .getTrackAlbum(id)
      .subscribe((data: any) => {
        console.log(data);

        this.track = data.items;
      });
  }

  getAlbum(id: string) {
    this.dataService.getAlbumDetail(id).subscribe((data: any) => {
      this.album = data;
    });
  }

  getTrackPlay(id: string) {
    this.link = id;
  }

  playTrack(track: Track) {
    console.log(track.uri);
    this.musicService.getCurrentPlaying();
    this.musicService.playTrack(track, 0).subscribe((data) => {});
  }
  ngOnDestroy(): void {
    this.getTrackAlbumSub.unsubscribe();
    this.getAlbumSub.unsubscribe();
  }
}
