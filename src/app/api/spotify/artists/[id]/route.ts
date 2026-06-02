import { NextResponse } from "next/server";
import { spotifyErrorPayload, spotifyGet } from "@/services/spotifyClient";
import { spotifyRoutes } from "@/constants/routes";
import { mapArtist, mapPaginatedItems, mapTrack } from "@/utils/spotifyMappers";
import type { Artist } from "@/types/artist";
import type { SpotifyTopTracksResponse } from "@/types/spotify";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const [artist, topTracks] = await Promise.all([
      spotifyGet<Artist>(spotifyRoutes.artist(id)),
      spotifyGet<SpotifyTopTracksResponse>(spotifyRoutes.artistTopTracks(id), {
        market: "BR",
      }),
    ]);

    return NextResponse.json({
      artist: mapArtist(artist),
      topTracks: mapPaginatedItems(topTracks.tracks, mapTrack),
    });
  } catch (error) {
    const payload = spotifyErrorPayload(error);

    return NextResponse.json(
      { message: payload.message },
      { status: payload.status },
    );
  }
}
