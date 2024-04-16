import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AudioComponent } from './Components/play/audio/audio.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MusicService } from './Service/music/music.service';
// import { PlaylistService } from './Service/PlayList/playlist.service';
import { HomeComponent } from './page/home/home.component';
// import { SearchService } from './Service/Search/search.service';
import { AuthService } from './Service/auth/auth.service';
import { DataService } from './Service/data/data.service';

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
    providers: [AuthService, MusicService, DataService],
})
export class AppComponent implements OnInit {
  title = 'web__nhac';
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
   

  }

  ngOnDestroy(): void {}
}
