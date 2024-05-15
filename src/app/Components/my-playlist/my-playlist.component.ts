import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../Service/data/data.service';
import { Track } from '../../Service/music/track';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { SearchService } from '../../Service/search/search.service';
@Component({
  selector: 'app-my-playlist',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './my-playlist.component.html',
  styleUrl: './my-playlist.component.scss',
})
export class MyPlaylistComponent implements OnInit {
  imgUrl = '';
  infoPlaylist: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private dataService: DataService,
    private searchService: SearchService
  ) {}
  dataTrack: any
  searchValue = ""
  data: any[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      console.log(code);

      if (code) {
        this.playlistService.getPlaylist(code).subscribe((playlists) => {
          this.playlistService.updateData(playlists.items)
         
          console.log('playlist', playlists);
          // this.data = playlists.items;
          
          this.getPicture(code);
          this.getInfoPlaylist(code);
          this.searchService.getInput().subscribe(data => {
            this.searchService.getTrackInputRS(data).subscribe(data => {
              console.log(data);
              this.dataTrack = data.tracks.items
              console.log(this.dataTrack[0].uri);
            })
          })
        });
      }
    });
  }
  Format(milliseconds: number): string {
    return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
  }

  getInfoPlaylist(id: string) {
    this.playlistService.getInfoPlaylist(id).subscribe((data: any) => {
      console.log(123, data);
      this.playlistService.data$.subscribe((data: any)=> {
        this.data = data
        console.log(this.data[0]);

      })
      this.infoPlaylist = data
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

  onInputChange(event: any) {
    this.searchService.setInputValue(this.searchValue);
    
    
  }

  addTrackToPlaylist(uri: string){
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if(code) {
        this.playlistService.addTrackToPlaylist(code, uri).subscribe((data)=> {       
          this.playlistService.getPlaylist(code).subscribe(data => {
          this.playlistService.updateData(data.items)
            
          })  
          this.playlistService.data$.subscribe((data: any)=> {
            this.data = data
          })
        })
      }
  })
}

  removeTrack(uri: string){
    this.route.paramMap.subscribe((params) => {
      const code = params.get('id');
      if(code) {
        this.playlistService.removeTrackFromPlaylist(code, uri).subscribe((data)=> {       
          this.playlistService.getPlaylist(code).subscribe(data => {
          this.playlistService.updateData(data.items)        
          })  
          this.playlistService.data$.subscribe((data: any)=> {
            this.data = data
          })
        })
        
      
      }
  })
  }
}

