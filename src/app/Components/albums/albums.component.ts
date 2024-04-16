import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../Service/music/Music.service';
import {  datatService } from '../../Service/data/Data.service';
import { Track } from '../../Service/Tracks';
import { Album } from '../../Service/Albums';
import { Subscription } from 'rxjs';

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
  getAlbumSub!: Subscription
  getTrackAlbumSub!: Subscription
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private music: MusicService,
    private dataservice: datatService
  ) {
    this.link = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
       this.getalbum(id);
      this.gettrackalbum(id);
    });
  }
  format(milliseconds: number): string {
  return this.dataservice.formatMillisecondsToMinutesAndSeconds(milliseconds)
  }
  updatedata(name: string, artist: string, img: string, id: string) {
    this.dataservice.updatedata(name, artist, img, id)
  }

   gettrackalbum(id: string) {
     this.getAlbumSub = this.getTrackAlbumSub =  this.dataservice.gettrackAlbum(id)
      .subscribe((data: any) => {
        console.log('trackalbum', data);
        this.track = data.items;
      });
  }

  getalbum(id: string) {
   this.dataservice.getalbumdetail(id)
      .subscribe((data: any) => {
        console.log('albms:', data);
        this.album = data;
      });
  }

  gettrackplay(id: string) {
    this.link = id;
  }

  ngOnDestroy(): void {
      this.getTrackAlbumSub.unsubscribe()
      this.getAlbumSub.unsubscribe()
  }
}
