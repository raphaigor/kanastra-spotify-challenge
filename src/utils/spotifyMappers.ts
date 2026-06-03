import type { Album } from "@/types/album";
import type { Artist } from "@/types/artist";
import type { Track } from "@/types/track";

export function mapArtist(artist: Artist): Artist {
  return {
    id: artist.id,
    name: artist.name,
    popularity: artist.popularity,
    genres: artist.genres ?? [],
    images: artist.images ?? [],
    followers: {
      total: artist.followers?.total ?? 0,
    },
    external_urls: {
      spotify: artist.external_urls.spotify,
    },
  };
}

export function mapAlbum(album: Album): Album {
  return {
    id: album.id,
    name: album.name,
    album_type: album.album_type,
    release_date: album.release_date,
    total_tracks: album.total_tracks,
    images: album.images ?? [],
    external_urls: {
      spotify: album.external_urls.spotify,
    },
  };
}

export function mapTrack(track: Track): Track {
  return {
    id: track.id,
    name: track.name,
    popularity: track.popularity,
    preview_url: track.preview_url,
    duration_ms: track.duration_ms,
    external_urls: {
      spotify: track.external_urls.spotify,
    },
    album: {
      name: track.album.name,
      images: track.album.images ?? [],
    },
  };
}

export function mapPaginatedItems<TInput, TOutput>(
  items: TInput[],
  mapper: (item: TInput) => TOutput,
) {
  return items.map(mapper);
}
