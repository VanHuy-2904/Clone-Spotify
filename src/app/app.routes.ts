import { Routes } from '@angular/router';
import { SearchComponent } from './Components/search/search.component';
import { AlbumsComponent } from './Components/albums/albums.component';
import { ArtistComponent } from './Components/artist/artist.component';
import { PlaylistsComponent } from './Components/playlistdetail/playlists.component';
import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';
import { authGuard } from './Service/auth/auth.guard';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { CallbackComponent } from './Components/callback/callback.component';
import { MyPlaylistComponent } from './Components/my-playlist/my-playlist.component';

export const routes: Routes = [
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component:LoginComponent
    },
 
    {
        path: '',
        component:DefaultLayoutComponent,

        children: [
            {
                path: 'artist/:id',
                component:ArtistComponent,
            },
            {
                path: 'albums/:id',
                component:AlbumsComponent
            },
            {
                path: 'playlist/:id',
                component:PlaylistsComponent
            },
            {
                path: 'search',
                component:SearchComponent,
                canActivate: [authGuard]
            },
            {
                path: 'MyPlaylist',
                component:MyPlaylistComponent,
                canActivate: [authGuard]

            },
            {
                path: '',
            
                component:HomeComponent
            },
        ]
    },
    
  
];
