import { Component, OnInit } from '@angular/core';
// import { PlaylistService } from '../../Service/PlayList/playlist.service';
import { RouterLink } from '@angular/router';
import { PlaylistService } from '../../Service/playlist/playlist.service';
import { AuthService } from '../../Service/auth/auth.service';
import { Data } from '../../Service/playlist/playlist.i';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  id: string = '';
  myPlaylist!: Data;
  constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.authService.getUserinfo().subscribe(() => {
      this.playlistService.getMyPlaylist().subscribe((dataP) => {
        {
          this.id = dataP.items[0].id;
        }
      });
      this.playlistService.getMyPlaylist().subscribe((data) => {
        console.log(data);
        this.myPlaylist = data;
      });
    });
  }

  createPlaylist() {
    this.authService.getUserinfo().subscribe((data) => {
      this.playlistService
        .createPlaylist(
          data.id,
          `My Playlist #` + (this.myPlaylist.items.length + 1),
        )
        .subscribe(() => {
          this.playlistService.getMyPlaylist().subscribe((data) => {
            this.myPlaylist = data;
          });
        });
    });
  }
}
