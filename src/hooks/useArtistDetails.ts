"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getArtistDetails } from "@/services/spotifyApi";

export function useArtistDetails(artistId: string | null) {
  return useQuery({
    queryKey: queryKeys.artistDetails(artistId),
    queryFn: () => getArtistDetails(artistId as string),
    enabled: Boolean(artistId),
  });
}
