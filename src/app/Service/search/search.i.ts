import { DataA, images } from '../album/album';
import { TrackDetail } from '../music/track-detail.i';
import { Data } from '../playlist/playlist.i';

export interface Search {
  tracks: DataT;
  artists: Artists;
  albums: DataA;
  playlists: Data;
}

export interface DataT {
  items: TrackDetail[];
}

export interface Artists {
  href: string;
  items: ArtistElement[];
}

export interface ArtistElement {
  href: string;
  id: string;
  images: images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
