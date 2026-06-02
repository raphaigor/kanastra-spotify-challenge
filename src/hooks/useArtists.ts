"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { getArtists } from "@/services/spotifyApi";

export function useArtists(query: string) {
  return useQuery({
    queryKey: queryKeys.artists(query),
    queryFn: () => getArtists(query),
  });
}
