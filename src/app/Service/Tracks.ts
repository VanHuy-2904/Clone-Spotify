import { Album } from "./Albums"
import { Artist } from "./Artists"

export class Track {
    id!: string
    name!: string
    nameAritst!: Artist[]
    uri!: string
    popularity!: number
    duration_ms!: number
    album!: Album
 }
