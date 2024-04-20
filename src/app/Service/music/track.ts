import { Album } from "../album/album"
import { Artist } from "../artist/Artists"

export class Track {
    id!: string
    name!: string
    artist!: Artist[]
    uri!: string
    popularity!: number
    duration_ms!: number
    album!: Album
 }
