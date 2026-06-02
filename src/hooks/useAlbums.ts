"use client";

import { useQuery } from "@tanstack/react-query";
import { ALBUMS_PER_PAGE } from "@/constants/pagination";
import { queryKeys } from "@/constants/queryKeys";
import { getArtistAlbums } from "@/services/spotifyApi";

export function useAlbums({
  artistId,
  query,
  page,
}: {
  artistId: string;
  query: string;
  page: number;
}) {
  return useQuery({
    queryKey: queryKeys.albums(artistId, query, page),
    queryFn: () =>
      getArtistAlbums({
        artistId,
        query,
        page,
        limit: ALBUMS_PER_PAGE,
      }),
  });
}
