// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { DataService } from '../../Service/data/data.service';
// // import { PlaylistService } from '../../Service/PlayList/playlist.service';

// @Component({
//   selector: 'app-playlists',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './playlists.component.html',
//   styleUrl: './playlists.component.scss',
// })
// export class PlaylistsComponent implements OnInit {
//   imgUrl = '';
//   infoPlaylist: any;
//   constructor(
//     private http: HttpClient,
//     private route: ActivatedRoute,
//     // private playlistService: PlaylistService,
//     private dataService: DataService,
//   ) {}
//   data: any[] = [];
//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params) => {
//       const code = params.get('id');
//       console.log(code);

//       if (code) {
//         // this.playlistService.getPlaylist(code).subscribe((playlists) => {
//         //   console.log('playlist', playlists);
//         //   this.data = playlists.items;
//         //   this.getPicture(code);
//         //   this.getInfoPlaylist(code);
//         // });
//       }
//     });
//   }
//   format(milliseconds: number): string {
//     return this.dataService.formatMillisecondsToMinutesAndSeconds(milliseconds);
//   }

//   getInfoPlaylist(id: string) {
//     // this.playlistService.getInfoPlaylist(id).subscribe((data: any) => {
//     //   console.log(data);
//     //   this.infoPlaylist = data;
//     // });
//   }

//   getPicture(id: string) {
//     // this.playlistService.getPicture(id).subscribe((data: any) => {
//     //   console.log(data);
//     //   this.imgUrl = data[0].url;
//     // });
//   }
//   updateData(
//     nameTrack: string,
//     artistTrack: string,
//     imgTrack: string,
//     idTrack: string,
//   ) {
//     this.dataService.updateData(nameTrack, artistTrack, imgTrack, idTrack);
//   }
// }
