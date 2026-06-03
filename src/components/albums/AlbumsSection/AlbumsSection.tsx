import { useState } from "react";
import { AlbumList } from "@/components/albums/AlbumList/AlbumList";
import { AlbumPagination } from "@/components/albums/AlbumPagination/AlbumPagination";
import { AlbumSearch } from "@/components/albums/AlbumSearch/AlbumSearch";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { ErrorState } from "@/components/common/ErrorState/ErrorState";
import { AlbumGridSkeleton } from "@/components/common/Skeleton/Skeleton";
import { ALBUMS_PER_PAGE } from "@/constants/pagination";
import { useUI } from "@/contexts/UIContext";
import { useAlbums } from "@/hooks/useAlbums";
import { useDebounce } from "@/hooks/useDebounce";

export function AlbumsSection({ artistId }: { artistId: string }) {
  const { t } = useUI();
  const [albumQuery, setAlbumQuery] = useState("");
  const [albumPage, setAlbumPage] = useState(1);
  const debouncedAlbumQuery = useDebounce(albumQuery);
  const albumsQuery = useAlbums({
    artistId,
    query: debouncedAlbumQuery,
    page: albumPage,
  });

  const totalPages = Math.max(
    1,
    Math.ceil((albumsQuery.data?.total ?? 0) / ALBUMS_PER_PAGE),
  );

  const handleAlbumQueryChange = (query: string) => {
    setAlbumQuery(query);
    setAlbumPage(1);
  };

  return (
    <section className="mt-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="text-2xl font-bold text-neutral-950">{t("albums")}</h3>
          <p className="mt-1 text-sm font-medium text-neutral-500">
            {t("albumsPerPage")}
          </p>
        </div>
        <div className="w-full md:max-w-sm">
          <AlbumSearch onChange={handleAlbumQueryChange} value={albumQuery} />
        </div>
      </div>
      {albumsQuery.isLoading ? <AlbumGridSkeleton /> : null}
      {albumsQuery.isError && (
        <div className="mt-5">
          <ErrorState
            message={t("genericAlbumsError")}
            onRetry={() => void albumsQuery.refetch()}
          />
        </div>
      )}
      {albumsQuery.data?.items.length === 0 && (
        <div className="mt-5">
          <EmptyState message={t("emptyAlbums")} />
        </div>
      )}
      {albumsQuery.data?.items ? <AlbumList albums={albumsQuery.data.items} /> : null}
      <AlbumPagination
        currentPage={albumPage}
        onPageChange={setAlbumPage}
        totalPages={totalPages}
      />
    </section>
  );
}
