import { useEffect, useState } from "react";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { ErrorState } from "@/components/common/ErrorState/ErrorState";
import { ArtistListSkeleton } from "@/components/common/Skeleton/Skeleton";
import { ArtistCard } from "@/components/artists/ArtistCard/ArtistCard";
import { ArtistSearch } from "@/components/artists/ArtistSearch/ArtistSearch";
import { useUI } from "@/contexts/UIContext";
import { useArtists } from "@/hooks/useArtists";
import { useDebounce } from "@/hooks/useDebounce";

export function ArtistList() {
  const { selectedArtistId, setSelectedArtistId, t } = useUI();
  const [artistQuery, setArtistQuery] = useState("sertanejo");
  const debouncedArtistQuery = useDebounce(artistQuery);
  const artistsQuery = useArtists(debouncedArtistQuery);

  useEffect(() => {
    setSelectedArtistId(null);
  }, [debouncedArtistQuery, setSelectedArtistId]);

  useEffect(() => {
    const firstArtist = artistsQuery.data?.items[0];

    if (!selectedArtistId && firstArtist) {
      setSelectedArtistId(firstArtist.id);
    }
  }, [artistsQuery.data, selectedArtistId, setSelectedArtistId]);

  return (
    <aside className="flex min-h-[520px] flex-col gap-5 rounded-lg border border-white/10 bg-neutral-950/70 p-4 shadow-2xl shadow-black/30">
      <ArtistSearch onChange={setArtistQuery} value={artistQuery} />
      <div>
        <h2 className="text-lg font-semibold text-white">{t("allArtists")}</h2>
        {/* <p className="mt-1 text-sm text-neutral-400">{t("heroCopy")}</p> */}
      </div>
      {artistsQuery.isLoading && <ArtistListSkeleton />}
      {artistsQuery.isError && (
        <ErrorState
          message={t("configError")}
          onRetry={() => void artistsQuery.refetch()}
        />
      )}
      {artistsQuery.data?.items.length === 0 && (
        <EmptyState message={t("emptyArtists")} tone="dark" />
      )}
      <div className="grid gap-3 overflow-y-auto pr-1">
        {artistsQuery.data?.items.map((artist) => (
          <ArtistCard artist={artist} key={artist.id} />
        ))}
      </div>
    </aside>
  );
}
