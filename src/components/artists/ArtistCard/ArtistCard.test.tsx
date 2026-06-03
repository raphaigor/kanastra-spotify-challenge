import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ArtistCard } from "./ArtistCard";
import { renderWithProviders } from "@/test/renderWithProviders";
import type { Artist } from "@/types/artist";

const artist: Artist = {
  id: "artist-1",
  name: "Liniker",
  popularity: 87,
  genres: ["mpb"],
  images: [{ url: "https://i.scdn.co/image/artist.jpg", width: 640, height: 640 }],
  followers: { total: 1520000 },
  external_urls: { spotify: "https://open.spotify.com/artist/artist-1" },
};

describe("ArtistCard", () => {
  it("renderiza nome, popularidade, seguidores e seleciona o artista", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ArtistCard artist={artist} />);

    const button = screen.getByRole("button", { name: /liniker/i });

    expect(screen.getByText("Liniker")).toBeInTheDocument();
    expect(screen.getByText("87/100")).toBeInTheDocument();
    expect(screen.getByText(/seguidores/i)).toBeInTheDocument();

    await user.click(button);

    expect(button).toHaveClass("border-emerald-300");
  });
});
