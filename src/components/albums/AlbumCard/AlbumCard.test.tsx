import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { AlbumCard } from "./AlbumCard";
import { renderWithProviders } from "@/test/renderWithProviders";
import type { Album } from "@/types/album";

const album: Album = {
  id: "album-1",
  name: "Caju",
  album_type: "album",
  release_date: "2024-08-19",
  total_tracks: 14,
  images: [{ url: "https://i.scdn.co/image/album.jpg", width: 640, height: 640 }],
  external_urls: { spotify: "https://open.spotify.com/album/album-1" },
};

describe("AlbumCard", () => {
  it("renderiza nome, imagem, ano e total de faixas", () => {
    const { container } = renderWithProviders(<AlbumCard album={album} />);

    expect(screen.getByText("Caju")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText(/14\s+faixas/i)).toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "https://i.scdn.co/image/album.jpg",
    );
  });
});
