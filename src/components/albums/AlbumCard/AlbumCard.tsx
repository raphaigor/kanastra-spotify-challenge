import Image from "next/image";
import { useUI } from "@/contexts/UIContext";
import { getImageUrl } from "@/utils/formatters";
import type { Album } from "@/types/album";

export function AlbumCard({ album }: { album: Album }) {
  const { t } = useUI();

  return (
    <a
      className="group rounded-lg border border-neutral-200 bg-white p-3 shadow-sm shadow-neutral-950/5 transition-all duration-200 ease-out hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/15 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02]"
      href={album.external_urls.spotify}
      rel="noreferrer"
      target="_blank"
    >
      <span className="relative block aspect-square overflow-hidden rounded-md bg-neutral-200">
        <Image
          alt=""
          className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 45vw, 180px"
          src={getImageUrl(album.images)}
        />
      </span>
      <span className="mt-3 line-clamp-2 block min-h-10 text-sm font-bold text-neutral-950">
        {album.name}
      </span>
      <span className="mt-2 flex items-center justify-between gap-2 text-xs text-neutral-500">
        <span>{album.release_date.slice(0, 4)}</span>
        <span>
          {album.total_tracks} {t("tracks")}
        </span>
      </span>
    </a>
  );
}
