import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './Service/auth.service';
import { AudioComponent } from './Components/play/audio/audio.component';
import { Observable, take } from 'rxjs';
import { MusicService } from './Service/Music/music.service';
import { PlaylistService } from './Service/PlayList/playlist.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, SidebarComponent, HttpClientModule, AudioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService, MusicService, PlaylistService]
})
export class AppComponent implements OnInit{
  title = 'web__nhac';
  constructor(private authservice: AuthService, private route: ActivatedRoute, private http: HttpClient, private renderer: Renderer2) {
    
   }
  ngOnInit() {
   
    // this.route.queryParams.subscribe(params => {
    //   const code = params['code'];
    //   if(code) {
    //     this.authservice.exchangecode(code)
    //     console.log(this.authservice.accessToken);
        
    //   }
    // })
  //   this.route.queryParams.subscribe(params => {
  //     const code = params['code'];
  //     if (code) {
  //       this.authservice.exchangecode(code)
  //     }  
  //   });

  //   this.getuserinfo().subscribe(rs => {
  //     // console.log(this.accessToken);            
  //     // this.name = rs.display_name
  //     localStorage.setItem('name', rs.display_name); 
  //     this.authservice.userNameSubject$.next(rs.display_name);
  //   })
    
  //   // this.name = localStorage.getItem('name')
  // }

  // getuserinfo(): Observable<any> {
  //   return this.http.get('https://api.spotify.com/v1/me', {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${this.authservice.accessToken}`
  //     })
  //   })
  }

    ngOnDestroy(): void {
    }


  
 

}
