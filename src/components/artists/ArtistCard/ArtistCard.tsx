import Image from "next/image";
import { Sparkles } from "lucide-react";
import clsx from "clsx";
import { useUI } from "@/contexts/UIContext";
import { compactNumber, getImageUrl } from "@/utils/formatters";
import type { Artist } from "@/types/artist";

type ArtistCardProps = {
  artist: Artist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
  const { locale, selectedArtistId, setSelectedArtistId, t } = useUI();
  const active = selectedArtistId === artist.id;

  return (
    <button
      className={clsx(
        "group grid min-h-28 grid-cols-[72px_1fr] gap-4 rounded-lg border p-3 text-left transition",
        active
          ? "border-emerald-300 bg-emerald-300/15 shadow-lg shadow-emerald-950/20"
          : "border-white/10 bg-white/[0.07] hover:border-emerald-300/70 hover:bg-white/[0.11]",
      )}
      onClick={() => setSelectedArtistId(artist.id)}
      type="button"
    >
      <div className="relative h-[72px] w-[72px] overflow-hidden rounded-md bg-neutral-900">
        <Image
          alt=""
          className="object-cover transition duration-300 group-hover:scale-105"
          fill
          sizes="72px"
          src={getImageUrl(artist.images)}
        />
      </div>
      <span className="min-w-0">
        <span className="line-clamp-2 block text-base font-semibold text-white">
          {artist.name}
        </span>
        <span className="mt-2 block text-xs text-neutral-400">
          {compactNumber(artist.followers.total, locale)} {t("followers")}
        </span>
        <span className="mt-2 flex items-center gap-2 text-xs text-emerald-200">
          <Sparkles className="h-3.5 w-3.5" />
          {artist.popularity}/100
        </span>
      </span>
    </button>
  );
}
