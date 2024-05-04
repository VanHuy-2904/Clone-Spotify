export const environment = {
  production: true,
  clientId: 'ecbaf92ef2c44f01b609211162ca5885',
  clientSecret: 'b30ae3e8ad38408685c1befea792dd1f',
  redirectUri: 'http://localhost:4200/callback',
  apiConfig: 'https://api.spotify.com/v1',
  scope:
    'user-read-private user-read-email user-modify-playback-state user-read-currently-playing user-library-read playlist-modify-public playlist-modify-private, user-top-read',
  state: '123',
  apiPaths: {
    mePlaylist: '/me/playlists ',
    picturePlaylist: (id: string) => `/playlists/${id}/images`,
    infoPlaylist: (id: string) => `/playlists/${id}`,
    getPlaylist: (id: string) => `/playlists/${id}/tracks`,
    topTrack: `/browse/featured-playlists`,
    getArtist: (id: string) => `/artists/${id}`,
    getTrackAlbum: (id: string) => `/albums/${id}/tracks`,
    getAlbumDetail: (id: string) => `/albums/${id}`,
    getNewAlbum: '/browse/new-releases',
  },
};
