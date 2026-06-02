export const queryKeys = {
  artists: (query: string) => ["artists", query] as const,
  artistDetails: (artistId: string | null) => ["artist-details", artistId] as const,
  albums: (artistId: string, query: string, page: number) =>
    ["albums", artistId, query, page] as const,
};
