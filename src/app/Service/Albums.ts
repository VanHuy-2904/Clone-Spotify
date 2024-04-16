import { Artist } from './Artists';

export class Album {
  id!: string;
  name!: string;
  images!: images[];
  artists!: Artist[];
  uri!: string;
}

export class images {
  url!: string;
}
