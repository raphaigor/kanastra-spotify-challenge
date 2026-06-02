import { NextResponse } from "next/server";
import { spotifyErrorPayload, spotifyGet } from "@/services/spotifyClient";
import { spotifyRoutes } from "@/constants/routes";
import { mapArtist, mapPaginatedItems } from "@/utils/spotifyMappers";
import type { SpotifySearchResponse } from "@/types/spotify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() || "brasil";

  try {
    const data = await spotifyGet<SpotifySearchResponse>(spotifyRoutes.search, {
      q: query,
      type: "artist",
      limit: 24,
      market: "BR",
    });

    return NextResponse.json({
      ...data.artists,
      items: mapPaginatedItems(data.artists.items, mapArtist),
    });
  } catch (error) {
    const payload = spotifyErrorPayload(error);

    return NextResponse.json(
      { message: payload.message },
      { status: payload.status },
    );
  }
}
