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
    const dataTrackCurrent = JSON.stringify(currentTrack);
    localStorage.setItem('trackCurrent', dataTrackCurrent);
    this.musicService.updateData();
    this.musicService.playSubject.next(true);

  }

  getTrackAlbum(id: string) {
    this.getAlbumSub = this.getTrackAlbumSub = this.dataService
      .getTrackAlbum(id)
      .subscribe((data: any) => {
        this.track = data.items;
      });
  }

  getAlbum(id: string) {
    if (id) {
      this.dataService.getAlbumDetail(id).subscribe((data: Album) => {
        this.album = data;
      });
    }
  }

  getTrackPlay(id: string) {
    this.link = id;
  }

  playTrack(track: Track) {
    // this.musicService.getCurrentPlaying().subscribe((data: any) => {
    //   console.log(data);

    // });
    localStorage.setItem('currentPlay', 'true')
    
    this.musicService.getTrack(track.id).subscribe((data: Track) => {
      const dataString = JSON.stringify(data);
      localStorage.setItem('trackCurrent', dataString);
    });
    this.musicService.playTrack(track, 0).subscribe((data) => {});
  }
  ngOnDestroy(): void {
    this.getTrackAlbumSub.unsubscribe();
    this.getAlbumSub.unsubscribe();
  }
}
