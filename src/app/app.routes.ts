import { Routes } from '@angular/router';

import { AlbumsComponent } from './Components/albums/albums.component';
import { ArtistComponent } from './Components/artist/artist.component';

import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './page/home/home.component';

import { CallbackComponent } from './Components/callback/callback.component';
import { MyPlaylistComponent } from './Components/my-playlist/my-playlist.component';

export const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent,
  },

  {
    path: '',
    component: DefaultLayoutComponent,

    children: [
      {
        path: 'artist/:id',
        component: ArtistComponent,
      },
      {
        path: 'albums/:id',
        component: AlbumsComponent,
      },

      {
        path: 'MyPlaylist',
        component: MyPlaylistComponent,
        canActivate: [authGuard],
      },
      {
        path: '',

        component: HomeComponent,
      },
    ],
  },
];
