import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AudioComponent } from './Components/play/audio/audio.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MusicService } from './Service/music/Music.service';
// import { PlaylistService } from './Service/PlayList/playlist.service';
import { HomeComponent } from './page/home/home.component';
import { datatService } from './Service/data/Data.service';
// import { SearchSerive } from './Service/Search/search.service';
import { AuthService } from './Service/auth/Auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    SidebarComponent,
    HttpClientModule,
    AudioComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [AuthService, MusicService, datatService],
})
export class AppComponent implements OnInit {
  title = 'web__nhac';
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
   

  }

  ngOnDestroy(): void {}
}
