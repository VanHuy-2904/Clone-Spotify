import { images } from '../album/album';

export interface Playlist {
  message: string;
  playlists: Data;
}

export interface Data {
  href: string;
  items: Item[];
}

export interface Item {
  href?: string;
  id?: string;
  images: images[];
  name?: string;
  type?: string;
  uri?: string;
}