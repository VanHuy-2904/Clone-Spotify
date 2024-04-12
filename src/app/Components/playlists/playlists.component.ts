import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit{
  imgurl = ''
  infoplaylist: any
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  data: any[] = []
    ngOnInit(): void {
      
      this.route.paramMap.subscribe(params => {
        const code = params.get('id');
        console.log(code);
        
        if(code) {
    

          this.getplaylist(code).subscribe(playlists => {
            console.log("playlist", playlists);
            this.data = playlists.items
            this.getpicture(code)
            this.getinfoplaylist(code)
          })
          
          
        }
      });
    }
    Format(milliseconds: number): string {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
    
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      return formattedTime;
    }


    getplaylist(idplaylist: string): Observable<any> {
    return this.http.get(`https://api.spotify.com/v1/playlists/${idplaylist}/tracks`, {
      headers: new HttpHeaders( {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
     })
    }


    getinfoplaylist(id: string){
      this.http.get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers : new HttpHeaders ({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }).subscribe((data  :any)=> {
      console.log(data);
      this.infoplaylist = data
    
      console.log(this.infoplaylist);
      
    })
  }

  getpicture(id :string) {
    this.http.get(`
    https://api.spotify.com/v1/playlists/${id}/images`, {
      headers : new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }).subscribe((data  :any)=> {
    console.log(data);
    this.imgurl = data[0].url
  
    console.log(this.imgurl);
    
  })
  }
}
