import type { Album } from "@/types/album";
import type { Artist } from "@/types/artist";
import type { Track } from "@/types/track";

export function mapArtist(artist: Artist): Artist {
  return artist;
}

export function mapAlbum(album: Album): Album {
  return album;
}

export function mapTrack(track: Track): Track {
  return track;
}

export function mapPaginatedItems<TInput, TOutput>(
  items: TInput[],
  mapper: (item: TInput) => TOutput,
) {
  return items.map(mapper);
}
