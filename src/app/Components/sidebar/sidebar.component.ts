import { Component, OnInit } from '@angular/core';
// import { PlaylistService } from '../../Service/PlayList/playlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    
  }
  
}
