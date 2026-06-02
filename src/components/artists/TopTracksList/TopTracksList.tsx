import Image from "next/image";
import { formatDuration, getImageUrl } from "@/utils/formatters";
import type { Track } from "@/types/track";

function TrackRow({ track, index }: { track: Track; index: number }) {
  return (
    <a
      className="grid grid-cols-[32px_48px_1fr_auto] items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 transition hover:border-emerald-300 hover:bg-emerald-50"
      href={track.external_urls.spotify}
      rel="noreferrer"
      target="_blank"
    >
      <span className="text-sm font-bold text-neutral-400">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative h-12 w-12 overflow-hidden rounded-md bg-neutral-200">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="48px"
          src={getImageUrl(track.album.images)}
        />
      </span>
      <span className="min-w-0">
        <span className="line-clamp-1 block font-semibold text-neutral-950">
          {track.name}
        </span>
        <span className="line-clamp-1 text-sm text-neutral-500">
          {track.album.name}
        </span>
      </span>
      <span className="hidden text-sm font-medium text-neutral-500 sm:block">
        {formatDuration(track.duration_ms)}
      </span>
    </a>
  );
}

export function TopTracksList({ tracks, title }: { tracks: Track[]; title: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-neutral-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {tracks.slice(0, 6).map((track, index) => (
          <TrackRow index={index} key={track.id} track={track} />
        ))}
      </div>
    </section>
  );
}
