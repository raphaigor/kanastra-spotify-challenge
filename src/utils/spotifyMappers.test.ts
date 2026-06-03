import { describe, expect, it } from "vitest";
import {
  mapAlbum,
  mapArtist,
  mapPaginatedItems,
  mapTrack,
} from "./spotifyMappers";
import type { Album } from "@/types/album";
import type { Artist } from "@/types/artist";
import type { Track } from "@/types/track";

describe("spotifyMappers", () => {
  it("mapeia artista removendo campos externos à UI", () => {
    const rawArtist = {
      id: "artist-1",
      name: "Liniker",
      popularity: 87,
      genres: ["mpb"],
      images: [],
      followers: { total: 1000 },
      external_urls: { spotify: "https://open.spotify.com/artist/artist-1" },
      raw_only: true,
    } satisfies Artist & { raw_only: boolean };

    const mapped = mapArtist(rawArtist);

    expect(mapped).toEqual({
      id: "artist-1",
      name: "Liniker",
      popularity: 87,
      genres: ["mpb"],
      images: [],
      followers: { total: 1000 },
      external_urls: { spotify: "https://open.spotify.com/artist/artist-1" },
    });
    expect(mapped).not.toHaveProperty("raw_only");
  });

  it("mapeia álbum mantendo apenas o contrato da UI", () => {
    const rawAlbum = {
      id: "album-1",
      name: "Caju",
      album_type: "album",
      release_date: "2024-08-19",
      total_tracks: 14,
      images: [],
      external_urls: { spotify: "https://open.spotify.com/album/album-1" },
      available_markets: ["BR"],
    } satisfies Album & { available_markets: string[] };

    expect(mapAlbum(rawAlbum)).not.toHaveProperty("available_markets");
  });

  it("mapeia faixa desacoplando a UI do payload bruto", () => {
    const rawTrack = {
      id: "track-1",
      name: "Tudo",
      popularity: 92,
      preview_url: null,
      duration_ms: 180000,
      external_urls: { spotify: "https://open.spotify.com/track/track-1" },
      album: { name: "Caju", images: [] },
      raw_only: true,
    } satisfies Track & { raw_only: boolean };

    expect(mapTrack(rawTrack)).not.toHaveProperty("raw_only");
  });

  it("mapeia coleções paginadas com generics", () => {
    const result = mapPaginatedItems([{ value: 1 }, { value: 2 }], (item) => ({
      label: String(item.value),
    }));

    expect(result).toEqual([{ label: "1" }, { label: "2" }]);
  });
});
