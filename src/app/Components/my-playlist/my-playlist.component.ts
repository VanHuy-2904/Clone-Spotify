import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../Service/PlayList/playlist.service';

@Component({
  selector: 'app-my-playlist',
  standalone: true,
  imports: [],
  templateUrl: './my-playlist.component.html',
  styleUrl: './my-playlist.component.scss',
})
export class MyPlaylistComponent implements OnInit {
  constructor(private myPlaylist: PlaylistService) {}

  ngOnInit(): void {
    this.myPlaylist.getmyPlaylist().subscribe((data) => {
      console.log(data);
    });
  }
}
