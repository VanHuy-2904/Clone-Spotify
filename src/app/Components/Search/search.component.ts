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
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  // inputvalue: BehaviorSubject<string> = new BehaviorSubject('')
  data: any[] = []
  searchvalue = ''
  constructor(private http: HttpClient, private searchservice: SearchSerive){}
  ngOnInit(): void {
    this.searchservice.getinput().subscribe(data=> {
      console.log(data);
      this.searchvalue = data
      console.log(this.searchvalue);
      
    })
    
    // this.inputvalue = this.searchservice.inputValue$
      this.getfeature().subscribe((data:any) => {
        console.log(data.playlists.items);
        this.data = data.playlists.items
      })
  }

  getfeature(): Observable<any>{
    return this.http.get('https://api.spotify.com/v1/browse/featured-playlists?locale=VN', {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    })
  }

  // getsearchvalue() {
  //   this.http.get('')
  // }

}