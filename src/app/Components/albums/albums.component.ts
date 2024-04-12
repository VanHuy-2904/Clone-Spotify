import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../Service/Music/music.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent implements OnInit {
  track : any[] = []
  album: any
  link: string
  Data: any[]= []
  constructor(private http: HttpClient, private route: ActivatedRoute, private music: MusicService){
    this.link = '';
  }

ngOnInit(): void {
  this.route.params.subscribe(params => {
      
    const id = params['id']
  this.getalbum(id)
   this.gettrackalbum(id)
  
  })
}
formatMillisecondsToMinutesAndSeconds(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return formattedTime;
}
updatedata(name: string, artist: string, img:string, id:string) {
  const newdata = {name, artist, img, id}


  this.music.updatedata(newdata)
  console.log(name);
  
}


gettrackalbum(id:string) {
  this.http.get(`https://api.spotify.com/v1/albums/${id}/tracks`,{
    headers: new HttpHeaders ({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      
    })
  }).subscribe((data: any) =>{
    console.log("trackalbum", data);
    this.track = data.items
    // console.log(this.track[0].id);
    
  })
}

getalbum(id:string) {
  this.http.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers : new HttpHeaders ({
      'Authorization': `Bearer ${localStorage.getItem('token')}`

    })
  }).subscribe((data: any) => {
    console.log("albms:", data);
    this.album = data
  })
}

  gettrackplay(id: string){
    this.link = id;
 
    
  }

  playmusic(trackuri: string) {
    console.log(1231321312321321, trackuri);
    const body = {
      context_uri: trackuri,
      offset: {
        position: 0
      },
      position_ms: 0
    };
    this.http.put('https://api.spotify.com/v1/me/player/play', body, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }).subscribe((data) => {
    console.log(data);
    
  })
}
  
}
