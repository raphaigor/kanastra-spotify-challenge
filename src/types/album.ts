import type { SpotifyImage } from "./spotify";

export type Album = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
};
