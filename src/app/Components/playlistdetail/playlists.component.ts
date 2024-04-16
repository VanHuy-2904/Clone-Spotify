import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { datatService } from '../../Service/data/Data.service';
// import { PlaylistService } from '../../Service/PlayList/playlist.service';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  imgurl = '';
  infoplaylist: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    // private playlistService: PlaylistService,
    private dataService: datatService,
  ) {}
  data: any[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      console.log(code);

      if (code) {
        // this.playlistService.getplaylist(code).subscribe((playlists) => {
        //   console.log('playlist', playlists);
        //   this.data = playlists.items;
        //   this.getpicture(code);
        //   this.getinfoplaylist(code);
        // });
      }
    });
  }
  Format(milliseconds: number): string {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
  }

  getinfoplaylist(id: string) {
    // this.playlistService.getinfoPlaylist(id).subscribe((data: any) => {
    //   console.log(data);
    //   this.infoplaylist = data;
    // });
  }

  getpicture(id: string) {
    // this.playlistService.getPicture(id).subscribe((data: any) => {
    //   console.log(data);
    //   this.imgurl = data[0].url;
    // });
  }
  updatedata(name: string, artist: string, img: string, id: string) {
    this.dataService.updatedata(name, artist, img, id);
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
