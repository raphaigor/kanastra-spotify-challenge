import { NextResponse } from "next/server";
import { MAX_FILTERED_ALBUMS } from "@/constants/pagination";
import { spotifyRoutes } from "@/constants/routes";
import { spotifyErrorPayload, spotifyGet } from "@/services/spotifyClient";
import { mapAlbum, mapPaginatedItems } from "@/utils/spotifyMappers";
import type { Album } from "@/types/album";
import type { SpotifyAlbumsResponse } from "@/types/spotify";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

async function getFilteredAlbums(artistId: string, query: string) {
  const normalizedQuery = query.toLowerCase();
  const collected: Album[] = [];
  let offset = 0;
  let total = 0;

  do {
    const page = await spotifyGet<SpotifyAlbumsResponse>(
      spotifyRoutes.artistAlbums(artistId),
      {
        include_groups: "album,single,compilation",
        limit: 50,
        market: "BR",
        offset,
      },
    );

    total = page.total;
    collected.push(...page.items);
    offset += page.limit;
  } while (offset < total && collected.length < MAX_FILTERED_ALBUMS);

  return {
    rawTotal: total,
    items: collected.filter((album) =>
      album.name.toLowerCase().includes(normalizedQuery),
    ),
  };
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";
  const limit = Number(searchParams.get("limit") ?? 20);
  const offset = Number(searchParams.get("offset") ?? 0);

  try {
    if (query) {
      const filtered = await getFilteredAlbums(id, query);
      const items = filtered.items.slice(offset, offset + limit);

      return NextResponse.json({
        items: mapPaginatedItems(items, mapAlbum),
        total: filtered.items.length,
        rawTotal: filtered.rawTotal,
        limit,
        offset,
      });
    }

    const data = await spotifyGet<SpotifyAlbumsResponse>(
      spotifyRoutes.artistAlbums(id),
      {
        include_groups: "album,single,compilation",
        limit,
        market: "BR",
        offset,
      },
    );

    return NextResponse.json({
      ...data,
      items: mapPaginatedItems(data.items, mapAlbum),
      rawTotal: data.total,
    });
  } catch (error) {
    const payload = spotifyErrorPayload(error);

    return NextResponse.json(
      { message: payload.message },
      { status: payload.status },
    );
  }
}
