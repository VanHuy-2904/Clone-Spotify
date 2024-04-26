import { images } from '../album/album';

export interface PlayList {
  id: string;
  images: images[];
  name: string;
  uri: string;
}
