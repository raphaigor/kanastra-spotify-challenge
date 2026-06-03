import Image from "next/image";
import { ExternalLink, Music2 } from "lucide-react";
import { AlbumsSection } from "@/components/albums/AlbumsSection/AlbumsSection";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { ErrorState } from "@/components/common/ErrorState/ErrorState";
import { ArtistDetailsSkeleton } from "@/components/common/Skeleton/Skeleton";
import { Stat } from "@/components/common/Stat/Stat";
import { TopTracksList } from "@/components/artists/TopTracksList/TopTracksList";
import { useUI } from "@/contexts/UIContext";
import { useArtistDetails } from "@/hooks/useArtistDetails";
import { compactNumber, getImageUrl } from "@/utils/formatters";

export function ArtistDetails() {
  const { locale, selectedArtistId, t } = useUI();
  const detailQuery = useArtistDetails(selectedArtistId);

  if (!selectedArtistId) {
    return <ArtistDetailsSkeleton />;
  }

  if (detailQuery.isLoading) {
    return <ArtistDetailsSkeleton />;
  }

  if (detailQuery.isError || !detailQuery.data) {
    return (
      <section className="rounded-lg bg-neutral-100 p-8">
        <ErrorState
          message={t("genericDetailError")}
          onRetry={() => void detailQuery.refetch()}
        />
      </section>
    );
  }

  const { artist, topTracks } = detailQuery.data;

  return (
    <section
      className="animate-fade-slide-up overflow-hidden rounded-lg bg-neutral-100 shadow-2xl shadow-black/20"
      key={artist.id}
    >
      <div className="relative min-h-[260px] bg-neutral-950 p-6 text-white md:p-8">
        <Image
          alt=""
          className="object-cover opacity-35"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          src={getImageUrl(artist.images)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end">
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-md bg-emerald-300 px-3 py-2 text-xs font-bold uppercase text-neutral-950">
            <Music2 className="h-4 w-4" />
            {t("artist")}
          </p>
          <h1 className="max-w-3xl text-5xl font-black tracking-normal md:text-7xl">
            {artist.name}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {artist.genres.slice(0, 4).map((genre) => (
              <span
                className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold capitalize"
                key={genre}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Stat label={t("popularity")} value={`${artist.popularity}/100`} />
          <Stat
            label={t("followers")}
            value={compactNumber(artist.followers.total, locale)}
          />
          <a
            className="flex min-h-24 items-center justify-between rounded-lg bg-neutral-950 p-4 font-bold text-white transition hover:bg-emerald-700"
            href={artist.external_urls.spotify}
            rel="noreferrer"
            target="_blank"
          >
            {t("openSpotify")}
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
        {topTracks.length > 0 ? (
          <TopTracksList title={t("topTracks")} tracks={topTracks} />
        ) : (
          <div className="mt-8">
            <EmptyState message={t("emptyArtists")} />
          </div>
        )}
        <AlbumsSection artistId={artist.id} />
      </div>
    </section>
  );
}
