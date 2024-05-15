import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Service/data/data.service';
import { Track } from '../../Service/music/track';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { MyPlaylistComponent } from '../my-playlist/my-playlist.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [FormsModule, CommonModule, MyPlaylistComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  imgUrl = '';
  infoPlaylist: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private dataService: DataService,
  ) {}
  user: boolean = false
  data: any[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      console.log(code);

      if (code) {
        this.playlistService.getPlaylist(code).subscribe((playlists) => {
          console.log('playlist', playlists);
          this.data = playlists.items;
          this.getPicture(code);
          this.getInfoPlaylist(code);
          console.log("asdsadsa", this.infoPlaylist.owner.id);
          
        
        });
      }
    });
  }
  Format(milliseconds: number): string {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
  }

  getInfoPlaylist(id: string) {
    this.playlistService.getInfoPlaylist(id).subscribe((data: any) => {
      console.log(data);
      this.infoPlaylist = data;
      if(data.owner.display_name !== 'spotify')
        if(data) {
          this.user = true
        }
        else {
          this.user = false
        }

    });
  }

  getPicture(id: string) {
    this.playlistService.getPicture(id).subscribe((data: any) => {
      console.log(data);
      this.imgUrl = data[0].url;
    });
  }
  updateData(track: Track) {
    this.dataService.updateData(track);
  }


}
