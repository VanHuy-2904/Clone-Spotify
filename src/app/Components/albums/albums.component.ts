import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from '../../Service/album/album';
import { DataService } from '../../Service/data/data.service';
import { Track } from '../../Service/music/track';

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
    private route: ActivatedRoute,
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
  updateData(track: Track) {
    this.dataService.updateData(track);
  }

  getTrackAlbum(id: string) {
    this.getAlbumSub = this.getTrackAlbumSub = this.dataService
      .getTrackAlbum(id)
      .subscribe((data: { items: Track[] }) => {
        this.track = data.items;
      });
  }

  getAlbum(id: string) {
    this.dataService.getAlbumDetail(id).subscribe((data: Album) => {
      this.album = data;
    });
  }

  getTrackPlay(id: string) {
    this.link = id;
  }

  ngOnDestroy(): void {
    this.getTrackAlbumSub.unsubscribe();
    this.getAlbumSub.unsubscribe();
  }
}
