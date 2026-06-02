export const apiRoutes = {
  artists: "/spotify/artists",
  artistDetails: (artistId: string) => `/spotify/artists/${artistId}`,
  artistAlbums: (artistId: string) => `/spotify/artists/${artistId}/albums`,
};

export const spotifyRoutes = {
  search: "/search",
  artist: (artistId: string) => `/artists/${artistId}`,
  artistTopTracks: (artistId: string) => `/artists/${artistId}/top-tracks`,
  artistAlbums: (artistId: string) => `/artists/${artistId}/albums`,
};
