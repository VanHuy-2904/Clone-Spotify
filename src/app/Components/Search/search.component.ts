import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchSerive } from '../../Service/Search/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  // inputvalue: BehaviorSubject<string> = new BehaviorSubject('')
  data: any[] = [];
  searchvalue = '';
  type = 'playlist';
  dataPlaylist: any
  dataTrack: any[]= []
  dataAlbum: any[]= []

  constructor(
    private http: HttpClient,
    private searchservice: SearchSerive,
  ) {}
  ngOnInit(): void {
    this.searchservice.getinput().subscribe((data) => {
      console.log(data);
      this.searchvalue = data;
      console.log(this.searchvalue);
      if (this.searchvalue) {
        this.data = []
        this.searchservice
          .getArtistRS(this.searchvalue)
          .subscribe((data: any) => {
            console.log(data);
            this.dataPlaylist = data.artists.items
            console.log(this.dataPlaylist);
            this.searchservice.getTrackRS(this.dataPlaylist[0].id).subscribe((data: any)=> {
              console.log("track: ", data);
              this.dataTrack = data.tracks
              this.searchservice.getAlbumRS(this.dataPlaylist[0].id).subscribe((data)=>{
                console.log(data);
                this.dataAlbum = data.items
              })
              
            })
            // this.data = data.artists.items;
            
          });
      } else {
        this.searchservice.getfeature().subscribe((data: any) => {
          console.log(data);
          
          this.data = data['playlists'].items;
        });
      }
    });

    console.log(this.type);
  }

  handelClick(type: string) {
    this.type = type;
    console.log(this.type);
  }
}
