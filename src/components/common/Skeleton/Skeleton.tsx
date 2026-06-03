import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx(
        "block animate-pulse rounded-md bg-neutral-200/80",
        className,
      )}
    />
  );
}

export function ArtistListSkeleton() {
  return (
    <div className="grid gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="grid min-h-28 grid-cols-[72px_1fr] gap-4 rounded-lg border border-white/10 bg-white/[0.07] p-3"
          key={index}
        >
          <Skeleton className="h-[72px] w-[72px] bg-white/15" />
          <div className="flex flex-col justify-center gap-3">
            <Skeleton className="h-4 w-3/4 bg-white/15" />
            <Skeleton className="h-3 w-1/2 bg-white/10" />
            <Skeleton className="h-3 w-20 bg-emerald-300/20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArtistDetailsSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg bg-neutral-100 shadow-2xl shadow-black/20">
      <div className="relative min-h-[360px] bg-neutral-900 p-6 md:p-8">
        <div className="flex h-full min-h-[300px] flex-col justify-end gap-4">
          <Skeleton className="h-8 w-24 bg-emerald-300/40" />
          <Skeleton className="h-14 w-3/4 bg-white/20 md:h-20" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 bg-white/15" />
            <Skeleton className="h-8 w-28 bg-white/15" />
            <Skeleton className="h-8 w-24 bg-white/15" />
          </div>
        </div>
      </div>
      <div className="p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24 bg-neutral-300" />
        </div>
        <div className="mt-8 grid gap-3">
          <Skeleton className="h-8 w-48" />
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="h-[74px]" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AlbumGridSkeleton() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          className="rounded-lg border border-neutral-200 bg-white p-3"
          key={index}
        >
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="mt-3 h-4 w-5/6" />
          <Skeleton className="mt-2 h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}
