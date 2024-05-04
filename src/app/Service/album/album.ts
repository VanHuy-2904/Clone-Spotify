import { Artist } from "../artist/Artists";
import { Track } from "../music/track";

export interface AlbumDetail {
  album_type:             string;
  href:                   string;
  id:                     string;
  images:                 images[];
  name:                   string;
  uri:                    string;
  artists:                Artist[];
  tracks:                 Track;
}


export interface Item {
  artists:           Artist[];
  href:              string;
  id:                string;
  name:              string;
  type:              string;
  uri:               string;
}

export class images {
  url!: string;
}
