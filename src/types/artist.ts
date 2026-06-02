import type { SpotifyImage } from "./spotify";

export type Artist = {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  images: SpotifyImage[];
  followers: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
};
