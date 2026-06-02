import { AlbumCard } from "@/components/albums/AlbumCard/AlbumCard";
import type { Album } from "@/types/album";

export function AlbumList({ albums }: { albums: Album[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {albums.map((album) => (
        <AlbumCard album={album} key={album.id} />
      ))}
    </div>
  );
}
