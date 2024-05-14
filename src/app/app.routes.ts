import { Routes } from '@angular/router';
import { AlbumsComponent } from './Components/albums/albums.component';
import { ArtistComponent } from './Components/artist/artist.component';
import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './page/home/home.component';
import { CallbackComponent } from './Components/callback/callback.component';
import { PlaylistsComponent } from './Components/play-list-detail/playlists.component';
import { SearchComponent } from './Components/search/search.component';

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
        path: 'playlist/:id',
        component: PlaylistsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [authGuard],
      },
      {
        path: '',

        component: HomeComponent,
      },
    ],
  },
];
