// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

import { images } from '../album/album';
import { AlbumDetail } from '../album/album-detail.i';
import { Artist } from '../artist/Artists';

export interface PlaylistDetail {
  href: string;
  items: Item[];
}

export interface Item {
  track: Data;
}

interface Data {
  album: AlbumDetail;
  artists: Artist[];
  duration_ms: number;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  type: string;
  uri: string;
}

export interface PlaylistInfo {
  id: string;
  images: images[];
  name: string;
  owner: owner;
  tracks: PlaylistDetail;
  uri: string;
}

interface owner {
  display_name: string;
  id: string;
  type: string;
}
