import { Artist } from '../artist/Artists';

export interface Album {
  albums: Data;
}

export interface Data {
  href: string;
  items: Item[];
}

export interface Item {
  href: string;
  id: string;
  images: images[];
  name: string;
  uri: string;
  artists: Artist[];
}

export class images {
  url!: string;
  height!: number;
  width!: number;
}
