import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../Service/Music/music.service';
import {  datatService } from '../../Service/Data/Data.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent implements OnInit {
  track: any[] = [];
  album: any;
  link: string;
  Data: any[] = [];
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
   this.dataservice.gettrackAlbum(id)
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

  playmusic(trackuri: string) {
    // console.log(1231321312321321, trackuri);
    const body = {
      context_uri: trackuri,
      offset: {
        position: 0,
      },
      position_ms: 0,
    };
    this.http
      .put('https://api.spotify.com/v1/me/player/play', body, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
