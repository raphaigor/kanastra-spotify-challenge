import type { SpotifyImage } from "./spotify";

export type Track = {
  id: string;
  name: string;
  popularity: number;
  preview_url: string | null;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  album: {
    name: string;
    images: SpotifyImage[];
  };
};
