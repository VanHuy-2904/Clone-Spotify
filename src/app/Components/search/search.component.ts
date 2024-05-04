import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlbumDetail } from '../../Service/album/album';
import { Track } from '../../Service/music/track';
import { SearchService } from '../../Service/search/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
//   data: any[] = [];
//   searchValue = '';
//   type = 'playlist';
//   dataPlaylist: any
//   dataTrack: Track[]= []
//   dataAlbum: AlbumDetail[]= []

//   constructor(
//     private http: HttpClient,
//     private searchService: SearchService,
//   ) {}
//   ngOnInit(): void {
   
//   }

//   handelClick(type: string) {
//     this.type = type;
//     console.log(this.type);
//   }
}
