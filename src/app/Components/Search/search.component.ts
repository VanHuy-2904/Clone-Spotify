import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchSerive } from '../../Service/search/search.service';
import { Track } from '../../Service/Tracks';
import { Album } from '../../Service/Albums';
// import { SearchSerive } from '../../Service/search/search.service';

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
  dataTrack: Track[]= []
  dataAlbum: Album[]= []

  constructor(
    private http: HttpClient,
    private searchservice: SearchSerive,
  ) {}
  ngOnInit(): void {
   
  }

  handelClick(type: string) {
    this.type = type;
    console.log(this.type);
  }
}
