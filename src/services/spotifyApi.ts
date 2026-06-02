import axios from "axios";
import { apiRoutes } from "@/constants/routes";
import type { Album } from "@/types/album";
import type {
  AlbumsResponse,
  ArtistDetailResponse,
  ArtistsResponse,
} from "@/types/spotify";

const api = axios.create({
  baseURL: "/api",
});

export async function getArtists(query: string) {
  const { data } = await api.get<ArtistsResponse>(apiRoutes.artists, {
    params: { query },
  });

  return data;
}

export async function getArtistDetails(artistId: string) {
  const { data } = await api.get<ArtistDetailResponse>(
    apiRoutes.artistDetails(artistId),
  );

  return data;
}

export async function getArtistAlbums<TAlbum extends Album = Album>({
  artistId,
  query,
  page,
  limit,
}: {
  artistId: string;
  query: string;
  page: number;
  limit: number;
}) {
  const { data } = await api.get<AlbumsResponse & { items: TAlbum[] }>(
    apiRoutes.artistAlbums(artistId),
    {
      params: {
        query,
        limit,
        offset: (page - 1) * limit,
      },
    },
  );

  return data;
}
