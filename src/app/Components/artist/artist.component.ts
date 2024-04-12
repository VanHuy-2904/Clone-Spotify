import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicService } from '../../Service/Music/music.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent implements OnInit{
  constructor(private http: HttpClient, private route: ActivatedRoute, private music: MusicService){}
  listitems: any[] = []
  artist: any
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      
      const id = params['id']
      console.log(id);
    this.getartist(id)
     this.getalbum(id)
    
    })
  
  }

 

  updatedata(name: string, artist: string, img:string, id:string) {
    const newdata = {name, artist, img, id}
  
  
    this.music.updatedata(newdata)
    console.log(name);
    
  }
  

  getalbum(id:string) {
    this.http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
      headers : new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }).subscribe((data: any) => {
      console.log("data tracks: ", data);
      this.listitems = data.tracks
     for(let i =0; i<this.listitems.length; i++ ){
      console.log(this.listitems[i].album.images[2]);
      
     }

     for(let i =0; i< this.listitems.length; i++) {
      // this.getTrackTime(this.listitems[i].id)
     }
      
      
    })
  }

  // getTrackTime(trackid: string){
  //   this.http.get(`https://api.spotify.com/v1/tracks/${trackid}`, {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     })
  //   }).subscribe((data: any) => {
  //     console.log("Time:", data);
      
  //   })
  // }

  formatMillisecondsToMinutesAndSeconds(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
}


getartist(id: string) {
  this.http.get(`https://api.spotify.com/v1/artists/${id}`, {
  headers : new HttpHeaders ({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    
  })
  }).subscribe((data:any)=> {
  console.log("artist: ", data);
  this.artist = data
  })
}

}
