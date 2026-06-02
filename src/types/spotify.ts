import type { Album } from "./album";
import type { Artist } from "./artist";
import type { Track } from "./track";

export type SpotifyImage = {
  url: string;
  width: number | null;
  height: number | null;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type ArtistsResponse = PaginatedResponse<Artist>;
export type AlbumsResponse = PaginatedResponse<Album> & {
  rawTotal: number;
};

export type ArtistDetailResponse = {
  artist: Artist;
  topTracks: Track[];
};

export type SpotifySearchResponse = {
  artists: PaginatedResponse<Artist>;
};

export type SpotifyAlbumsResponse = PaginatedResponse<Album>;

export type SpotifyTopTracksResponse = {
  tracks: Track[];
};
