import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { HomeComponent } from './page/home/home.component';
import { AlbumsComponent } from './Components/albums/albums.component';
import { SearchComponent } from './Components/Search/search.component';
import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';
import { ArtistComponent } from './Components/artist/artist.component';
import { PlaylistsComponent } from './Components/playlists/playlists.component';

export const routes: Routes = [
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
                component:ArtistComponent
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
                component:SearchComponent
            },
            {
                path: '',
            
                component:HomeComponent
            },
        ]
    },
    
  
];
