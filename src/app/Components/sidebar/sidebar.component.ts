import { Component, OnInit } from '@angular/core';
// import { PlaylistService } from '../../Service/PlayList/playlist.service';
import { RouterLink } from '@angular/router';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { AuthService } from '../../Service/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  id: string = ""
  constructor(private playlistService: PlaylistService, private authService: AuthService) {}
  ngOnInit() {
    this.authService.getUser().subscribe(data=>{console.log(data);
      this.playlistService.getMyPlaylist(data.id).subscribe(dataP => {{console.log(dataP);
          this.id = dataP.items[0].id
      }})
      })
  }
  
}
